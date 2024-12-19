import "./Wishes.css";

import { useNavigate, useParams } from "react-router-dom";

import { motion } from "framer-motion";
import { usePalette } from "@roylee1997/react-palette";

import Progress from "../../components/Progress/Progress";
import MusicCard from "../../components/MusicCard/MusicCard";
import TMessagesData from "../../typings/MessagesData";

// albumArts
import firstAlbumArt from "../../assets/sampleData/first-album-art.webp";
import secondAlbumArt from "../../assets/sampleData/second-album-art.webp";

// musicFilePaths
import firstMusic from "../../assets/sampleData/music/night-city.mp3";
import secondMusic from "../../assets/sampleData/music/almost-nothing.mp3";

// framer transition and variants
const commonTransition = {
  ease: [0.43, 0.13, 0.23, 0.96],
  duration: 0.5,
};

const messageContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96],
      duration: 0.5,
    },
  },
};

const messages = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};


const sampleMessagesDataArray: TMessagesData[] = [
  {
    albumArt: firstAlbumArt,
    musicName: "Song Play - R E L's Version",
    messageInParas: [
        "We extend our heartfelt congratulations to Shriyansh on joining Stefto Management Services! Your journey with us marks the beginning of an exciting chapter, and we are thrilled to have your talents and dedication as part of our team. May this role bring you immense growth, success, and satisfaction as you contribute to our shared vision and goals. Wishing you all the very best for a rewarding career ahead, filled with opportunities to shine and make a meaningful impact. Here's to a bright future together!"
    ],
    musicFilePath: firstMusic,
  },
  {
    albumArt: secondAlbumArt,
    musicName: 'Song Almost nothing - Stranding" Ending Song',
    messageInParas: [
      "We are delighted to welcome Shriyansh to the Stefto family! Your journey with Stefto Management Services begins today, and we couldn’t be more excited to have your energy, creativity, and dedication on board. This is not just a new job but the start of an incredible adventure filled with opportunities to grow, learn, and make a lasting impact. As you step into this new role, we wish you a rewarding career ahead, brimming with success, innovation, and memorable achievements. Together, let’s aim for greatness and shape a brighter future. Here's to many milestones, challenges conquered, and dreams realized as part of our shared journey at Stefto. Welcome aboard, Shriyansh! Stefto is the trade name of Incredible Management Services (India) Private Limited (CIN: U74140DL2007ULT166363).",
      "Registered Office Address: 3, DLF, Moti Nagar, Delhi-110015",
      "Head Office: Plot No. 112, Udyog Vihar, Phase-1, Gurugram, Haryana-122016",
      "New Delhi Office: IInd Floor, DLF, Moti Nagar, New Delhi-110015",
      "West Delhi Office: WZ-1, Upper Ground Floor, Main Nazafgarh Road, Uttam Nagar West, Delhi-110059",
      "Noida Office: Plot No. 125A, Block-C, Sec-2, Phase-1, Noida, Gautam Buddha Nagar, U.P.-201301",
      "Pune Office: 501, 5th Floor, Pride Icon, Kharadi, Pune, Maharashtra-411014",
      "Regd. Office: 3, DLF, Moti Nagar, Delhi-110015"
  
    
    ],
    musicFilePath: secondMusic,
  },
];

const Wishes = () => {
  const navigate = useNavigate();
  const { id = 0 } = useParams();

  if (Number(id) < 0 || sampleMessagesDataArray[Number(id)] == undefined) {
    return <p>Invalid Wish Message Id</p>;
  }

  const {
    data: colorData,
    loading: colorDataIsLoading,
    error,
  } = usePalette(sampleMessagesDataArray[Number(id)].albumArt);

  if (error) {
    return <h1>Invalid Wish Message Id</h1>;
  }

  return (
    <motion.main
      initial="initial"
      animate="animate"
      exit="exit"
      className="wishes-wrapper h-screen w-screen flex flex-col justify-between items-center"
    >
      <Progress
        primaryColor={colorData?.vibrant}
        secondaryColor={colorData?.darkVibrant}
        messageDataArrayLength={sampleMessagesDataArray.length}
      />
      <motion.div
        className="lg:w-11/12 rounded-t-2xl md:rounded-t-xl flex md:flex-row flex-col-reverse"
        style={{
          backgroundColor: colorDataIsLoading ? "#fff" : colorData?.vibrant,
        }}
        initial={{ y: "1000px" }}
        animate={{ y: "0px" }}
        exit={{ y: "1000px" }}
        transition={commonTransition}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={(_, info) => {
          if (info.offset.x > 50) {
            if (Number(id) > 0 && Number(id) < sampleMessagesDataArray.length) {
              navigate(`/wishes/${Number(id) - 1}`);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }
          } else if (info.offset.x < -50) {
            if (
              Number(id) >= 0 &&
              Number(id) < sampleMessagesDataArray.length - 1
            ) {
              navigate(`/wishes/${Number(id) + 1}`);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }
          } else {
            console.log(null);
          }
        }}
      >
        <motion.div
          className="md:w-1/2"
          initial="hidden"
          animate="show"
          variants={messageContainer}
        >
          {sampleMessagesDataArray[Number(id)].messageInParas.map(
            (eachPara, index) => {
              return (
                <motion.p
                  className="p-8 message text-3xl"
                  variants={messages}
                  key={index + 2045}
                >
                  {eachPara}
                </motion.p>
              );
            }
          )}
        </motion.div>
        <div className="md:w-1/2 h-1/2 md:h-auto flex justify-center items-center">
          <MusicCard
            albumArt={sampleMessagesDataArray[Number(id)].albumArt}
            primaryColor={colorData?.vibrant}
            musicName={sampleMessagesDataArray[Number(id)].musicName}
            musicFilePath={sampleMessagesDataArray[Number(id)].musicFilePath}
          />
        </div>
      </motion.div>
    </motion.main>
  );
};

export default Wishes;
