import { NextRequest } from 'next/server';

const PLACES_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('query');
  if (!query) {
    return Response.json({ error: 'Missing query parameter' }, { status: 400 });
  }

  if (!PLACES_API_KEY) {
    // Return a placeholder when no API key is configured
    return Response.json({ photoUrl: null, noKey: true });
  }

  try {
    // Step 1: Text search to find the place and get photo references
    const origin = request.nextUrl.origin;

    const searchRes = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': PLACES_API_KEY,
        'X-Goog-FieldMask': 'places.photos',
        'Referer': origin,
      },
      body: JSON.stringify({ textQuery: query }),
    });

    if (!searchRes.ok) {
      const errBody = await searchRes.text();
      console.error('[maps/photo] Places API error:', searchRes.status, errBody);
      return Response.json({ photoUrl: null, error: 'Places search failed', details: errBody });
    }

    const searchData = await searchRes.json();
    const photos = searchData?.places?.[0]?.photos;

    if (!photos || photos.length === 0) {
      return Response.json({ photoUrl: null, error: 'No photos found' });
    }

    // Step 2: Build the photo media URL (Google redirects to the actual image)
    const photoName = photos[0].name;
    const photoUrl = `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=1200&key=${PLACES_API_KEY}`;

    return Response.json({ photoUrl });
  } catch (err) {
    console.error('[maps/photo] error:', err);
    return Response.json({ photoUrl: null, error: 'Internal error' });
  }
}
