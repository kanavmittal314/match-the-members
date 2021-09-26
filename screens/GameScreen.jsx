import React, { useState } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";

import { styles } from "../constants/Styles";
import { nameToPic } from "../constants/Constants";
import { useEffect } from "react";
import { shuffle } from "../utils/ArrayUtils";
const names = Object.keys(nameToPic);

export default function GameScreen() {
  // TODO: Declare and initialize state variables here, using "useState".
  const [correctNum, setCorrectNum] = useState(0);
  const [totalNum, setTotalNum] = useState(0);
  const [correctState, setCorrectState] = useState("aadypillai");
  const [nameOptionsList, setNameOptionsList] = useState([]);
  const [finished, setFinished] = useState(false);
  const [imagePath, setImagePath] = useState("");

  // State for the timer is handled for you.
  const [timeLeft, setTimeLeft] = useState(5000);

  // Called by the timer every 10 seconds
  const countDown = () => {
    if (timeLeft > 0) {
      setTimeLeft(timeLeft - 10);
      // Time still left
      // TODO: update appropriate state variables
    } else {
      // Time has expired
      // TODO: update appropriate state variables
      setFinished(true);
      setTotalNum(totalNum + 1);
    }
  };

  // This is used in the useEffect(...) hook bound on a specific STATE variable.
  // It updates state to present a new member & name options.
  const getNextRound = () => {
    // Fetches the next member name to guess.
    let correct = names[Math.floor(Math.random() * names.length)];
    //console.log(correct);
    let correctName = nameToPic[correct][0];
    let correctImage = nameToPic[correct][1];
    //console.log(nameToPic[correct]);
    // Generate 3 more wrong answers.
    let nameOptions = [correctName];
    while (nameOptions.length < 4) {
      let wrong = names[Math.floor(Math.random() * names.length)];
      let wrongName = nameToPic[wrong][0];
      if (!nameOptions.includes(wrongName)) {
        nameOptions.push(wrongName);
      }
    }
    nameOptions = shuffle(nameOptions);

    // TODO: Update state here.
    setCorrectState(correct);
    setNameOptionsList(nameOptions);    
    setTimeLeft(5000);
  };

  // Called when user taps a name option.
  // TODO: Update correct # and total # state values.
  const selectedNameChoice = (index) => {

    if (nameOptionsList[index] === nameToPic[correctState][0]){
      setCorrectNum(correctNum + 1);
    }
    setTotalNum(totalNum + 1);
  };
    
  useEffect(() => {
    const timer = setInterval(() => {
      countDown();
    }, 10);
               // clearing interval
    return () => clearInterval(timer);
  });

  // TODO: Finish this useEffect() hook such that we automatically
  // get the next round when the appropriate state variable changes.
  useEffect(() => {
    getNextRound();
  }, [totalNum]);

  // Set up four name button components
  const nameButtons = [];
  for (let i = 0; i < 4; i++) {
    const j = i;
    nameButtons.push(
      <TouchableOpacity onPress={() => {selectedNameChoice(j)}} style = {styles.button}><Text style = {styles.buttonText}>{nameOptionsList[j]}</Text></TouchableOpacity> 

      // TODO: Implement a Button/Pressable type that shows a name choice, and implement the functionality when a user press on it
      // Hint: Most functionality is already taken care of by one of the functions already defined
    );
  }

  const timeRemainingStr = (timeLeft / 1000).toFixed(2);
  // Style & return the view.
  return (
    <View>
      <Text style = {styles.scoreText}> Score: {correctNum}/{totalNum}</Text>
      <Text style = {styles.timerText}> Time Remaining: {timeRemainingStr} </Text>
      
      <Image source = {nameToPic[correctState][1]} style={styles.image}></Image>
      
      {nameButtons[0]}
      {nameButtons[1]}
      {nameButtons[2]}
      {nameButtons[3]}

    </View>
  );
}

      /* TODO: Build out your UI using Text and Image components. }
      {/* Hint: What does the nameButtons list above hold? 
          What types of objects is this list storing?
          Try to get a sense of what's going on in the for loop above. }*/