import React, {useRef, useState} from 'react';
import {FlatList, Image, ImageBackground, Text, View} from 'react-native';
import ButtonOutline from '../../../components/button-outline';
import {listTopic} from '../../../shared/staticData';
import {sizing} from '../../../shared/styling';
import styles from './styles';
import {
  firstStepQuote,
  fourthStepQuote,
  secondStepQuote,
  thirdStepQuote,
} from '../../../shared/static-data/register-quote';

const bgQuote = require('../../../assets/images/yellow_round.png');
const lamp = require('../../../assets/images/lamp.png');

export default function ContentStep7({
  onPressGoals,
  specific_goal,
  name,
  substep,
}) {
  const flatListRef = useRef();
  const [activeIndexTutorial, setActiveIndexTutorial] = useState(0);

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

  function getDataQuote() {
    switch (substep) {
      case 'b':
        return secondStepQuote;
      case 'c':
        return thirdStepQuote;
      case 'd':
        return fourthStepQuote;
      default:
        return firstStepQuote;
    }
  }

  function renderInput() {
    return (
      <View style={[styles.inputWrapper, styles.ctnInputWrapper]}>
        <View style={styles.ctnText}>
          <Text style={styles.txtInput}>{getTextInput()}</Text>
        </View>
        <View style={styles.ctnGoalsInput}>
          {['Yes', 'No'].map(item => (
            <ButtonOutline
              // btnStyle={styles.btnStyle}
              isSelected={item === specific_goal}
              onPress={() => {
                onPressGoals(item);

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
      <View style={styles.ctnImg}>
        <Image source={item.icon} style={styles.imgQuote} />
      </View>
      <Text style={styles.txtQuote}>{item.label}</Text>
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
        <FlatList
          data={getDataQuote()}
          extraData={activeIndexTutorial}
          pagingEnabled
          style={styles.ctnList}
          horizontal
          ref={flatListRef}
          onMomentumScrollEnd={onMomentoumScrollEnd}
          showsHorizontalScrollIndicator={false}
          renderItem={renderListQuote}
          keyExtractor={item => `${Date.now()}${item.label}`}
        />
        <View style={styles.dotWrapper}>
          {getDataQuote().map((item, index) => (
            <View
              key={item.label}
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
