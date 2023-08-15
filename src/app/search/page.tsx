import SearchPageContent from "@/components/SearchPageContent";
import Container from "@/components/ui/Container";
import { authOptions } from "@/lib/auth";
import spotifyApi from "@/lib/spotify";
import { Metadata } from "next";
import { Session, getServerSession } from "next-auth";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Spotify Player (Clone) - Search",
  description: "Music for everyone",
  icons: {
    icon: "/images/spotify-logo.png",
  },
};

const getSearchResult = async (session: Session | null, q: string) => {
  if (!session || !session.accessToken || !q) {
    return;
  }

  spotifyApi.setAccessToken(session.accessToken);

  const searchResult = await spotifyApi.search(q, [
    "track",
    "playlist",
    "album",
    "artist",
    "episode",
  ]);

  return searchResult.body;
};

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { q: string };
}) => {
  const session = await getServerSession(authOptions);
  const searchResult = await getSearchResult(session, searchParams.q);

  return (
    <Container className="h-full overflow-hidden">
      <SearchPageContent result={searchResult} />
    </Container>
  );
};

export default SearchPage;
