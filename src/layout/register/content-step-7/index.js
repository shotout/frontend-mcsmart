import React, {createRef, useEffect, useRef, useState} from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import {connect} from 'react-redux';
import ButtonOutline from '../../../components/button-outline';
import {sizing} from '../../../shared/styling';
import styles from './styles';
import states from './states';

const bgQuote = require('../../../assets/images/yellow_round.png');
const lamp = require('../../../assets/images/lamp.png');
const economyIcon = require('../../../assets/images/category/economy_business.png');
const celebrityIcon = require('../../../assets/images/category/celebrities.png');
const foodDrinkCategory = require('../../../assets/images/category/food_drink.png');
const sportCategory = require('../../../assets/images/category/sport.png');

function ContentStep7({
  onPressGoals,
  specific_goal,
  name,
  substep,
  listFactRegister,
}) {
  const flatListRef = useRef();
  const currentIndex = useRef(0);
  const [activeIndexTutorial, setActiveIndexTutorial] = useState(0);

  function getDataQuote() {
    switch (substep) {
      case 'b':
        return listFactRegister.filter(item => item.category_id === 4);
      case 'c':
        return listFactRegister.filter(item => item.category_id === 5);
      case 'd':
        return listFactRegister.filter(item => item.category_id === 11);
      default:
        return listFactRegister.filter(item => item.category_id === 3);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      // Panggil fungsi di sini
      currentIndex.current =
        currentIndex.current + 1 > 4 ? 0 : currentIndex.current + 1;
      setActiveIndexTutorial(currentIndex.current);
      flatListRef.current.scrollToIndex({
        animated: true,
        index: currentIndex.current,
      });
    }, 5000);

    return () => {
      // Membersihkan interval saat komponen dibongkar
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    currentIndex.current = 0;
    setActiveIndexTutorial(0);
  }, [substep]);

  const onMomentoumScrollEnd = e => {
    const width = sizing.getDimensionWidth(1);
    const pageNumber = Math.min(
      Math.max(Math.floor(e.nativeEvent.contentOffset.x / width + 0.5) + 1, 0),
      4,
    );
    setActiveIndexTutorial(pageNumber - 1);
  };

  function getTextInput() {
    switch (substep) {
      case 'b':
        return 'Would you like to make an impression in professional situations with your co-workers, business partners or your boss?';
      case 'c':
        return 'Would you like to impress your children or other young relatives with your knowledge?';
      case 'd':
        return 'Would you like to impress your common members in your sports club using your knowledge?';
      default:
        return 'Would you like to impress your friends or partner with your knowledge?';
    }
  }

  function getIconCategory(categoryId) {
    switch (categoryId) {
      case 4:
        return economyIcon;
      case 3:
        return celebrityIcon;
      case 5:
        return foodDrinkCategory;
      case 11:
        return sportCategory;
      default:
        return null;
    }
  }

  function renderInput() {
    return (
      <View style={[styles.inputWrapper, styles.ctnInputWrapper]}>
        <View style={styles.ctnText}>
          <Text numberOfLines={4} style={styles.txtInput}>
            {getTextInput()}
          </Text>
        </View>
        <View style={styles.ctnGoalsInput}>
          {['Yes', 'No'].map(item => (
            <ButtonOutline
              // btnStyle={styles.btnStyle}
              isSelected={item === specific_goal}
              onPress={() => {
                onPressGoals(item.toLowerCase());

                flatListRef.current.scrollToIndex({animated: true, index: 0});
              }}
              btnStyle={styles.btnOption}
              theme="blue"
              label={item}
              key={item}
            />
          ))}
        </View>
      </View>
    );
  }

  const renderListQuote = ({item}) => (
    <View style={styles.ctnTextQuote}>
      <Text style={styles.txtQuote} numberOfLines={5} ellipsizeMode="tail">
        {item.title}
      </Text>
    </View>
  );

  function renderQuote() {
    return <Image style={styles.ctnQuotes} source={bgQuote} />;
  }

  return (
    <View style={styles.ctnRoot}>
      {renderQuote()}
      <View style={styles.ctnFlatlist}>
        <View style={styles.ctnWelcome}>
          <Text style={styles.txtWelcome}>{`${
            name ? `Hey ${name}` : 'Hey'
          }, let’s personalize the topics that you will learn about with McSmart according to the situations that you will use them in!`}</Text>
        </View>
        {renderInput()}
      </View>
      <View style={styles.ctnItem}>
        <View style={styles.ctnImg}>
          <Image
            source={getIconCategory(getDataQuote()[0].category_id)}
            style={styles.imgQuote}
          />
        </View>
        <FlatList
          data={getDataQuote()}
          extraData={activeIndexTutorial}
          pagingEnabled
          style={styles.ctnList}
          horizontal
          ref={flatListRef}
          // onMomentumScrollEnd={onMomentoumScrollEnd}
          showsHorizontalScrollIndicator={false}
          renderItem={renderListQuote}
          keyExtractor={item => item.id}
        />
        <View style={styles.dotWrapper}>
          {getDataQuote().map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.ctnDot,
                index === activeIndexTutorial && styles.blackDot,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

export default connect(states)(ContentStep7);
