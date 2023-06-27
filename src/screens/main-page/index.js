import React, { createRef, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AnimatedLottieView from "lottie-react-native";
import { createAnimatableComponent } from "react-native-animatable";
import { connect } from "react-redux";
import styles from "./styles";
import { listFact } from "../../shared/static-data/listFact";
import { sizing } from "../../shared/styling";
import { useBackgroundQuotes } from "../../helpers/hook/useBackgroundQuotes";
import QuotesContent from "../../components/quotes-content-fast-image";
// import ModalCategories from '../../layout/main-page/modal-categories';
import states from "./states";

import IconCategories from "../../assets/svg/icon_categories.svg";
import IconShare from "../../assets/svg/icon_share.svg";
import IconSetting from "../../assets/svg/icon_setting.svg";
import IconLove from "../../assets/svg/icon_love_tap.svg";
import IconLike from "../../assets/svg/icon_like.svg";
import ThemeIcon from "../../assets/svg/theme_icon.svg";
import ButtonIcon from "../../components/button-icon";
import ModalTheme from "../../layout/main-page/modal-theme";
import { handleBasicPaywall, handlePayment, isUserPremium } from "../../helpers/user";
import { getSetting } from "../../shared/request";
import notifee from '@notifee/react-native';
import { setAnimationSlideStatus, setInitialLoaderStatus } from "../../store/defaultState/actions";
const ViewAnimation = createAnimatableComponent(View);

const freebadgeIcon = require("../../assets/images/rocket_white.png");
const doubleTap = require("../../assets/lottie/double_tap.json");
const swipeupIcon = require("../../assets/lottie/swipe_up.json");

function MainPage({ userThemes,  runAnimationSlide,
  finishInitialLoader,
  paywallNotifcation,
  animationCounter, }) {
  const [isTutorial, setTutorial] = useState({
    visible: false,
    step: 1,
  });
  const [activeSlide, setActiveSlide] = useState(0);
  const [themeUser] = useBackgroundQuotes(userThemes);
  const [quoteLikeStatus, setQuoteLikeStatus] = useState(false);
  const [isEnableFreePremium, setEnableFreePremium] = useState(false);
  const refCategory = createRef();
  const refThemes = createRef();

  const getActiveQuote = () => {
    if (listFact.length > 0 && listFact[activeSlide]) {
      return listFact[activeSlide];
    }
    return null;
  };
  useEffect(() => {
   
      handleShowPaywall();
  
  }, []);
  const handleShowPaywall = async () => {
    const res = await getSetting();
    const initNotification = await notifee.getInitialNotification();
    const getInitialPlacement =
      initNotification?.notification?.data || paywallNotifcation;
    setEnableFreePremium(res.data.value !== 'true');
    if (res.data.value === 'true' && !isUserPremium() && !isFromOnboarding) {
      // Paywall open apps
      if (getInitialPlacement) {
        const paywallNotifCb = () => {
          setInitialLoaderStatus(false);
          handleShowPopupShare();
        };
        handlePayment(getInitialPlacement?.placement, paywallNotifCb);
      } else {
        const getCurrentOpenApps = await AsyncStorage.getItem('latestOpenApps');
        const mainDate = reformatDate(parseFloat(getCurrentOpenApps));
        const isMoreThan3Hours = isMoreThanThreeHoursSinceLastTime(mainDate);
        const stringifyDate = Date.now().toString();
        if (!getCurrentOpenApps || isMoreThan3Hours) {
          handleBasicPaywall(handleShowPopupShare);
          AsyncStorage.setItem('latestOpenApps', stringifyDate);
        } else {
          setAnimationSlideStatus(true);
        }
      }

    
    } else {
     
      setAnimationSlideStatus(true);
    }
  };

  useEffect(() => {
    const checkTutorial = async () => {
      const isFinishTutorial = await AsyncStorage.getItem("isFinishTutorial");
      if (isFinishTutorial !== "yes") {
        setTutorial({
          visible: true,
          step: 1,
        });
      }
    };
    checkTutorial();
  }, []);

  useEffect(() => {
    const activeQuote = getActiveQuote();
    let isLiked = false;
    if (activeQuote) {
      if (!activeQuote.like) {
        isLiked = false;
      }
      if (activeQuote.like) {
        if (activeQuote.like?.type) {
          if (activeQuote.like?.type === "1" || activeQuote.like?.type === 1) {
            isLiked = true;
          }
        }
      }
    }

    setQuoteLikeStatus(isLiked);
  }, [activeSlide]);

  const onMomentoumScrollEnd = (e) => {
    const height = sizing.getDimensionHeight(1);
    const pageNumber = Math.min(
      Math.max(Math.floor(e.nativeEvent.contentOffset.y / height + 0.5) + 1, 0),
      listFact?.length || 0
    );
    setActiveSlide(pageNumber - 1);
  };

  const handleSkipTutorial = async () => {
    if (isTutorial.step === 2) {
      await AsyncStorage.setItem("isFinishTutorial", "yes");
      setTutorial({
        visible: false,
        step: 1,
      });
    } else {
      setTutorial({
        ...isTutorial,
        step: isTutorial.step + 1,
      });
    }
  };
  console.log("Check theme:", themeUser);

  const renderFactItem = ({ item, index }) => {
    const getImageContent = themeUser.imgLocal;
    return (
      <QuotesContent
        item={item}
        themeUser={themeUser}
        source={getImageContent}
        // source={require(themeUser.urlLocal)}
      />
    );
  };

  function renderFreeBadge() {
    return (
      <TouchableOpacity style={styles.ctnFreeBadge} onPress={handleBasicPaywall}>
        <Text style={styles.txtFreeBadge}>Try it free!</Text>
        <Image source={freebadgeIcon} style={styles.ctnIconCrown} />
      </TouchableOpacity>
    );
  }

  function renderButton() {
    const bgStyle = {
      // backgroundColor:
      //   themeUser.id === 4 || themeUser.id === 2
      //     ? 'rgba(255, 255, 255, 0.2)'
      //     : 'rgba(0, 0, 0, 0.7)',
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    };
    return (
      <View style={styles.btnWrapper}>
        <View style={styles.subBottomWrapper}>
          <TouchableWithoutFeedback>
            <View style={[styles.ctnRounded, bgStyle]}>
              {/* {renderSharePopup()} */}
              <IconShare width="90%" height="90%" />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={[styles.ctnRounded, bgStyle]}>
              {quoteLikeStatus ? (
                <IconLove width="80%" height="80%" />
              ) : (
                <IconLike width="80%" height="80%" />
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.ctnRow}>
          <View style={styles.rowLef}>
            <ButtonIcon
              type="dark"
              source={<IconCategories width="100%" height="100%" />}
              ctnIcon={styles.ctnIconCategories}
              label="Categories"
              btnStyle={styles.btnCategories}
              txtStyle={styles.txtCategory}
              // onPress={() => {
              //   refCategory.current.show();
              // }}
            />
          </View>
          <View style={styles.rowRight}>
            <View style={styles.ctnShare}>
              <ButtonIcon
                type="dark"
                source={<ThemeIcon width="100%" height="100%" />}
                btnStyle={styles.btnRight}
                onPress={() => {
                  refThemes.current.show();
                }}
              />
            </View>
            <ButtonIcon
              type="dark"
              source={<IconSetting width="100%" height="100%" />}
              btnStyle={[styles.btnRight, styles.mgLeft]}
              onPress={() => {
                // refSetting.current.show();
              }}
            />
          </View>
        </View>
      </View>
    );
  }

  function renderContentTutorial() {
    if (isTutorial.step === 1) {
      return (
        <View style={styles.ctnRound}>
          <ViewAnimation
            animation="bounceIn"
            duration={200}
            style={styles.ctnCenter}
          >
            <View style={styles.ctnIconTutorial}>
              <AnimatedLottieView
                source={swipeupIcon}
                style={styles.animationStyle}
                autoPlay
                duration={3000}
                loop={false}
              />
            </View>
            <Text style={styles.txtTutorial}>Swipe up for the next Fact.</Text>
            <ViewAnimation delay={1000} animation="fadeIn" duration={2000}>
              <Text style={styles.txtDescTutorial}>
                {"Tap anywhere to go\nto the next tutorial"}
              </Text>
            </ViewAnimation>
          </ViewAnimation>
        </View>
      );
    }
    if (isTutorial.step === 2) {
      return (
        <View style={styles.ctnRound}>
          <ViewAnimation
            animation="bounceIn"
            duration={800}
            style={styles.ctnCenter}
          >
            <View style={styles.ctnIconTutorial}>
              <AnimatedLottieView
                source={doubleTap}
                style={styles.animationStyle}
                autoPlay
                duration={3000}
                loop={false}
              />
            </View>
            <Text style={styles.txtTutorial}>Double tap to like the Fact.</Text>
            <ViewAnimation delay={1000} animation="fadeIn" duration={2000}>
              <Text style={styles.txtDescTutorial}>
                {"Tap anywhere to go\nto the next tutorial"}
              </Text>
            </ViewAnimation>
          </ViewAnimation>
        </View>
      );
    }
    return null;
  }

  function renderTutorial() {
    if (isTutorial.visible) {
      return (
        <TouchableWithoutFeedback onPress={handleSkipTutorial}>
          <View style={styles.ctnTutorial}>{renderContentTutorial()}</View>
        </TouchableWithoutFeedback>
      );
    }
    return null;
  }

  return (
    <View style={styles.ctnRoot}>
      <FlatList
        style={styles.ctnRoot}
        data={listFact || []}
        pagingEnabled
        onMomentumScrollEnd={onMomentoumScrollEnd}
        scrollsToTop={false}
        showsVerticalScrollIndicator={false}
        // onEndReached={handleEndReach}
        onEndReachedThreshold={0.9}
        renderItem={renderFactItem}
        keyExtractor={(item, index) => `${item.id} ${index}`}
      />
      {renderButton()}
      {renderFreeBadge()}
      {renderTutorial()}

      {/* <ModalCategories
        refPanel={refCategory}
        contentRef={(c) => {
          if (c) {
            refCategory.current = {
              ...c,
            };
          }
        }}
        onClose={() => {
          refCategory.current.hide();
        }}
      /> */}
      <ModalTheme
        contentRef={refThemes}
        onClose={() => {
          refThemes.current.hide();
        }}
      />
    </View>
  );
}

export default connect(states)(MainPage);
