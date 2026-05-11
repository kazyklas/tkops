import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, description, difficulty, name, email } = body;

  if (!title || !description || !difficulty) {
    return NextResponse.json(
      { error: 'Missing required fields: title, description, difficulty' },
      { status: 400 }
    );
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_REPO = process.env.GITHUB_REPO;

  if (!GITHUB_TOKEN || !GITHUB_REPO) {
    return NextResponse.json(
      { error: 'Server configuration error. Please try again later.' },
      { status: 500 }
    );
  }

  const [owner, repo] = GITHUB_REPO.split('/');

  if (!owner || !repo) {
    return NextResponse.json(
      { error: 'Invalid GITHUB_REPO format. Expected: owner/repo' },
      { status: 500 }
    );
  }

  const issueBody = `
## Topic Request

**Title:** ${title}

**Description:**
${description}

**Suggested Difficulty:** ${difficulty === 'all' ? 'All levels' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}

---

${name ? `**Submitted by:** ${name}` : ''}
${email ? `**Contact:** ${email}` : ''}
  `.trim();

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `[Topic Request] ${title}`,
          body: issueBody,
          labels: ['topic-request'],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create issue');
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      issueUrl: data.html_url,
      issueNumber: data.number,
    });
  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json(
      { error: 'Failed to submit topic request. Please try again later.' },
      { status: 500 }
    );
  }
}