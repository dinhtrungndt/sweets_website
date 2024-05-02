import React, { useEffect, useState } from "react";
import moment from "moment";
import "./css/story.css";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import Slider from "react-slick";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserByID } from "../../../../services/pages/userServices";

const RenderItemStory = ({ story, currentuser }) => {
  const [seenStory, setSeenStory] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const hashStoryFM = story.flatMap((item) => item.idUsers);
  let name = hashStoryFM.map((item) => item.name)[0];
  if (name.length > 10) {
    name = name.substring(0, 10 - 3) + "...";
  }

  if (hashStoryFM.map((item) => item._id)[0] === currentuser) {
    return null;
  }

  const handleSeenStory = () => {
    setIsModalOpen(true);
    setSeenStory(true);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className={seenStory ? "border_story_seen" : "border_story"}>
      <img
        className="avatar_story"
        src={hashStoryFM.map((item) => item.avatar)[0]}
        alt="Avatar"
        onClick={handleSeenStory}
      />
      <p className="name_story">{name}</p>
      <>
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          closeIcon={null}
          centered
          footer={[<div key="back"></div>]}
        >
          <Slider
            {...settings}
            infinite={false}
            autoplay={true}
            autoplaySpeed={2000}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            dots={true}
            arrows={false}
          >
            {story.map((item, index) => (
              <div key={index}>
                {item.media.length !== 0 ? (
                  <>
                    {item.media[0].type === "image" ? (
                      <img
                        className="img_story"
                        src={item.media[0].url}
                        alt="Avatar"
                      />
                    ) : (
                      <ReactPlayer
                        url={item.media[0].url}
                        width={550}
                        height={400}
                        controls
                        thumbnail={item.media[0].url}
                        className="video_story"
                      />
                    )}
                  </>
                ) : (
                  <div className="frameContent">
                    <p className="itemContent-other">{item.content}</p>
                  </div>
                )}
              </div>
            ))}
          </Slider>
        </Modal>
      </>
    </div>
  );
};

const StoryPage = ({ story, userA }) => {
  const navigate = useNavigate();
  const [seenStory, setSeenStory] = useState(false);
  const [modelSelectFeeingStory, setModelSelectFeeingStory] = useState(false);
  const [user, setUser] = useState(userA);

  const onGetByUserId = async () => {
    try {
      const response = await getUserByID(userA);
      // console.log("response", response);
      setUser(response);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  // console.log(">>>>>>>>------------- user", user);

  const handleOk = () => {
    setModelSelectFeeingStory(false);
  };
  const handleCancel = () => {
    setModelSelectFeeingStory(false);
  };

  const userStories = story.filter((story) => story.idUsers._id === user._id);
  const showStoryMe = userStories.length > 0;
  const handleSeenStory = (selectedStory) => {
    setModelSelectFeeingStory(true);
    setSeenStory(true);
  };

  const filterStories = (stories) => {
    const currentTimestamp = moment();
    return stories.filter((story) => {
      const storyTimestamp = moment(story.createAt);
      const hoursDiff = currentTimestamp.diff(storyTimestamp, "hours");
      return hoursDiff < 24;
    });
  };

  const filteredStories = filterStories(story);

  const userStoriesMap = {};
  filteredStories.forEach((story) => {
    const user = story.idUsers._id;
    if (!userStoriesMap[user]) {
      userStoriesMap[user] = [story];
    } else {
      userStoriesMap[user].push(story);
    }
  });

  const groupedStories = Object.values(userStoriesMap);

  // console.log(">>>>>>>>------------- userStories", userStories.length === 0);
  // console.log(
  //   ">>>>>>>>------------- groupedStories",
  //   groupedStories?.map((item) => item[0].idUsers._id) === user._id
  // );

  const isMyStoryExpired = userStories.every((story) => {
    const currentTimestamp = moment();
    const storyTimestamp = moment(story.createAt);
    const hoursDiff = currentTimestamp.diff(storyTimestamp, "hours");
    return hoursDiff >= 24;
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const showStoryNoti = () => {
    toast.error("Hết hạn xem story hoặc bạn chưa đăng tin", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    onGetByUserId();
  }, []);

  return (
    <div className="T">
      <div className="container_story_me">
        <div className="container_me">
          {userStories.length !== 0 && !isMyStoryExpired ? (
            <div
              onClick={
                showStoryMe && !isMyStoryExpired
                  ? () => handleSeenStory(userStories)
                  : () => setModelSelectFeeingStory(true)
              }
              className={
                showStoryMe && !isMyStoryExpired
                  ? seenStory
                    ? "border_story_seen"
                    : "border_story"
                  : "add_me"
              }
            >
              <div className="border_me">
                {user.avatar ? (
                  <img className="avatar_me" src={user.avatar} />
                ) : (
                  <img
                    className="avatar_me"
                    src="https://res.cloudinary.com/dqo8whkdr/image/upload/v1690714031/cld-sample-3.jpg"
                    alt="Default Avatar"
                  />
                )}
              </div>
            </div>
          ) : (
            <div
              onClick={() => showStoryNoti()}
              className={
                showStoryMe && !isMyStoryExpired
                  ? seenStory
                    ? "border_story_seen"
                    : "border_story"
                  : "add_me"
              }
            >
              <div className="border_me">
                {user.avatar ? (
                  <img className="avatar_me" src={user.avatar} />
                ) : (
                  <img
                    className="avatar_me"
                    src="https://res.cloudinary.com/dqo8whkdr/image/upload/v1690714031/cld-sample-3.jpg"
                    alt="Default Avatar"
                  />
                )}
              </div>
            </div>
          )}
          <p className="name_me">Tin của bạn</p>
        </div>
        <>
          <Modal
            open={modelSelectFeeingStory}
            onOk={handleOk}
            onCancel={handleCancel}
            closeIcon={null}
            centered
            footer={[<div key="back"></div>]}
          >
            <Slider
              {...settings}
              infinite={false}
              autoplay={true}
              autoplaySpeed={2000}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              dots={true}
              arrows={false}
            >
              {userStories.map((item, index) => (
                <div key={index}>
                  {item.media.length !== 0 ? (
                    <>
                      {item.media[0].type === "image" ? (
                        <img
                          className="img_story"
                          src={item.media[0].url}
                          alt="Avatar"
                        />
                      ) : (
                        <ReactPlayer
                          url={item.media[0].url}
                          width={550}
                          height={400}
                          controls
                          thumbnail={item.media[0].url}
                          className="video_story"
                        />
                      )}
                    </>
                  ) : (
                    <div className="frameContent">
                      <p className="itemContent-other">{item.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </Slider>
          </Modal>
        </>
        <div className="showStoryFor">
          {groupedStories.map((item, index) => (
            <RenderItemStory
              story={item}
              currentuser={user._id}
              key={index.toString()}
            />
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default StoryPage;
