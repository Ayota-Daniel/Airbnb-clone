import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import ReservationsClient from "./ReservationsClient";

type Props = {};

const page = async (props: Props) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    <ClientOnly>
      <EmptyState title="Unauthorized" subtitle="Please login" />
    </ClientOnly>;
  }

  const reservations = await getReservations({
    authorId: currentUser?.id,
  });

  if ((await reservations).length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations found !"
          subtitle="Looks like you no reservation on your properties"
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default page;
