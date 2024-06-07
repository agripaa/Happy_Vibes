import { useSelector } from "react-redux";
import CarouselTimer from "./CarouselTimer";
import HeaderStories from "./HeaderStories";
import { motion } from "framer-motion";
import { Fragment } from "react";

export default function DisplayStories({ items }) {
  const { countSlideStories, indexContentStories } = useSelector(
    (state) => state?.story
  );
  return (
    <Fragment>
      <section className="UserStoriesDisplay">
        <div className="ListUserStories">
          <div className="CarouselStories">
            {items.stories?.map((_, i) => (
              <CarouselTimer key={i} playSLide={i} items={items} />
            ))}
          </div>
          <div className="DataStories">
            <HeaderStories user={items.name} />
          </div>
        </div>
        <motion.figure
          key={countSlideStories}
          initial={{
            x: countSlideStories === indexContentStories ? "-100vw" : "100vw",
          }}
          animate={{
            x: countSlideStories === indexContentStories ? 0 : "100vw",
          }}
          className="ContentStories"
          style={{
            overflowX: "hidden",
            backgroundColor:
              items.stories[countSlideStories].type === "text" &&
              items.stories[countSlideStories].bgColor,
          }}
        >
          {items.stories[countSlideStories].type === "image" ? (
            <>
              <img src={items.stories[countSlideStories].image} alt="" />
              <figcaption>
                <p>{items.stories[countSlideStories].text}</p>
              </figcaption>
            </>
          ) : (
            <p
              style={{
                fontWeight: items.stories[countSlideStories]?.fontWeight,
              }}
            >
              {items.stories[countSlideStories].text}
            </p>
          )}
        </motion.figure>
        {/* <button>Share</button> */}
      </section>
    </Fragment>
  );
}
