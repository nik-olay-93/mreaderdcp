import { ButtonGroup } from "@chakra-ui/button";
import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { DefBookFragment, useRateBookMutation } from "../generated/graphql";

interface RateButtonProps {
  book: DefBookFragment;
}

export const RateButton: React.FC<RateButtonProps> = ({ book }) => {
  const [rateBook] = useRateBookMutation();
  const [curScore, setScore] = useState(book.myRating);
  const rate = async (score: number) => {
    if (score === curScore) {
      return;
    }

    setScore(score);

    await rateBook({
      variables: {
        bookId: book.id,
        score,
      },
      update: (cache) => {
        cache.modify({
          id: cache.identify(book),
          fields: {
            myRating() {
              return score;
            },
            ratingsSum(prevSum, { readField }) {
              return prevSum + score - (readField("myRating") as number);
            },
          },
        });
      },
    });
  };
  return (
    <ButtonGroup>
      {[1, 2, 3, 4, 5].map((val) => (
        <Button
          key={val}
          onClick={async () => {
            await rate(val);
          }}
        >
          {val}
        </Button>
      ))}
    </ButtonGroup>
  );
};
