import React from "react";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listing/ListingCard";
import { safeListings, SafeUser } from "../types";

interface FavoriteClientProps {
  listings: safeListings[];
  currentUser?: SafeUser | null;
}

type Props = {};

const FavoriteClient: React.FC<FavoriteClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="list of places you have favorited" />
      <div
        className={`mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8`}
      >
        {listings.map((listing, index) => (
          <ListingCard key={index} currentUser={currentUser} data={listing} />
        ))}
      </div>
    </Container>
  );
};

export default FavoriteClient;
