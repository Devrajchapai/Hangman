import { useAudioPlayer } from 'expo-audio';
import { Link, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, Modal, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Easy from '../assets/data/easy.json';
import Hard from '../assets/data/hard.json';
import Medium from '../assets/data/medium.json';


const Guess = () => {
  const { userName, selectDifficulty, music, audio, } = useLocalSearchParams();
  const [instructionModalVisibility, setInstructionModalVisibility] = useState(true);
  const [instrcutionCount, setInstructionCount] = useState(0);
  const [mistake, setMistake] = useState(0);
  const [answer, setAnswer] = useState('');
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [correctAnswerModal, setCorrectAnswerModal] = useState(false);
  const [wrongAnswerModal, setWrongAnswerModal] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [dashboardModal, setDashboardModal] = useState(false);
  const [developerModal, setDeveloperModal] = useState(false);
  const [questions, setQuestions] = useState<number[]>([]);
  const [totalQestions, setTotalQuestions] = useState(0);

  const keyboardKeys = {
        Q: 'Q',
        W: 'W',
        E: 'E',
        R: 'R',
        T: 'T',
        Y: 'Y',
        U: 'U',
        I: 'I',
        O: 'O',
        P: 'P',
        A: 'A',
        S: 'S',
        D: 'D',
        F: 'F',
        G: 'G',
        H: 'H',
        J: 'J',
        K: 'K',
        L: 'L',
        Z: 'Z',
        X: 'X',
        C: 'C',
        V: 'V',
        B: 'B',
        N: 'N',
        M: 'M',
      }; 
 

   const displayText = [
       "WELCOME TO THE DEVIL'S GAME",
        "YOU HAVE 10 RIDDLES TO SOLVE",
        "IF YOU SOLVE THEM ALL CORRECTLY…",
        "YOUR FRIEND LIVES",
        "BUT IF YOU FAIL—JUST THREE WRONG ANSWERS…",
        "YOUR FRIEND DIES",
        "SO… WILL YOU PLAY?"
];

const guessBackgroungAudio = require('../assets/sounds/crows.wav');
const guessBackgroungAudioPlayer = useAudioPlayer(guessBackgroungAudio);

const instructionButtonAudio = require('../assets/sounds/instructionbutton.mp3');
const instructionButtonAudioPlayer = useAudioPlayer(instructionButtonAudio); 

const correctAudio = require("../assets/sounds/correct.wav");
const correctAudioPlayer = useAudioPlayer(correctAudio);

const wrongAudio = require('../assets/sounds/wrong.wav');
const wrongAudioPlayer = useAudioPlayer(wrongAudio);

const neckbreakAudio = require('../assets/sounds/neckbreak.wav');
const neckbreakAudioPlayer = useAudioPlayer(neckbreakAudio);

const dashboardAudio = require('../assets/sounds/dashboard.wav');
const dashboardAudioPlayer = useAudioPlayer(dashboardAudio);

const sicktothethroatAudio = require('../assets/sounds/sicktothethroat.wav');
const sicktothethroatAudioPlayer = useAudioPlayer(sicktothethroatAudio);

const waitAudio = require('../assets/sounds/wait.wav');
const waitAudioPlayer = useAudioPlayer(waitAudio);

   const instructionValidation = () =>{
      instrcutionCount == 6?setInstructionModalVisibility(false):setInstructionModalVisibility(true);
   }

const musicSetting = () =>{
        music === 'true' ? guessBackgroungAudioPlayer.play():guessBackgroungAudioPlayer.pause();
}

  const audioPlayer = (currentAudio:string)=>{
        if(audio == 'true'){
            switch(currentAudio){
                case 'instructionButton':
                    instructionButtonAudioPlayer.play();
                    break;

                case 'correct':
                  correctAudioPlayer.play();
                  break;

                case 'wrong':
                  wrongAudioPlayer.play();
                  break;

                case 'neckbreak':
                  neckbreakAudioPlayer.play();
                  break;
                
                case 'dashboard': 
                  dashboardAudioPlayer.play();
                  break;
                
                case 'sicktothethroat':
                  sicktothethroatAudioPlayer.play();
                  break;

                case 'wait':
                  waitAudioPlayer.play();
                  break;

                default:
                    break;

            }
        }
    }

    const changeInstruction = () =>{
    audioPlayer('instructionButton');
    setInstructionCount(instrcutionCount+1);
    if(instrcutionCount > 5 ){
      setInstructionModalVisibility(false);
    }
  }

  const generateQuestion = () => {
    if (questions.length >= 50) {
      console.warn("All questions used!");
      return null;
    }

    let position;
    do {
      position = Math.floor(Math.random() * 50);
    } while (questions.includes(position));

    setQuestions(prevQuestions => [...prevQuestions, position]);
    return position;
  };

  const askQuestion = () => {
    const position = generateQuestion();
    if (position === null) return;

    if (selectDifficulty === 'easy') {
      setCurrentQuestion(Easy[position].question);
      setAnswer(Easy[position].answer);
      } else if (selectDifficulty === 'medium') {
      setCurrentQuestion(Medium[position].question);
      setAnswer(Medium[position].answer);
      } else if (selectDifficulty === 'hard') {
      setCurrentQuestion(Hard[position].question);
      setAnswer(Hard[position].answer);
    }

    setGuess('');
  };

  const Checkanswer = () =>{
    audioPlayer('instructionButton');
    if(guess != ''){
      if((guess.toLowerCase()) === (answer.toLowerCase())){
        setScore(score+1);
      setCorrectAnswerModal(true);
    }else{
      setWrongAnswerModal(true);
      setMistake(mistake+1);
    }
    setTotalQuestions(totalQestions+1);
    askQuestion();
  }
  }

  const erase = ()=>{
      setGuess(()=>guess.slice(0,-1));
  };

  const playagain = () =>{
    setMistake(0);
    setScore(0);
    dashboardAudioPlayer.pause();
    guessBackgroungAudioPlayer.play();
    setDashboardModal(false);
    setDeveloperModal(false);
    askQuestion();
  }
  useEffect(()=>{
   musicSetting();
   askQuestion();
  },[])

  useEffect(()=>{
    if(mistake== 1){
      audioPlayer('sicktothethroat');
    }else if(mistake == 2){
      audioPlayer('wait')
    }else if(mistake == 3){
      audioPlayer('neckbreak');
      guessBackgroungAudioPlayer.pause();
      audioPlayer('dashboard');
      setDashboardModal(true);
    }
  },[mistake])

  useEffect(()=>{
    if(correctAnswerModal){
      setTimeout(()=>{
        audioPlayer('correct');
        setCelebrate(true);
      }, 1000)

      setTimeout(()=>{
        setCorrectAnswerModal(false);
        setCelebrate(false);
      }, 2000)
    }

  },[correctAnswerModal]);

  useEffect(()=>{
    if(wrongAnswerModal){
      audioPlayer('wrong');
      setTimeout(()=>{
        setWrongAnswerModal(false);
      },1000)
    }
  },[wrongAnswerModal])

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View>
            <StatusBar 
                  animated = {true}
                  backgroundColor= 'white'
                  barStyle= 'dark-content'
                  hidden= {false}
              />
              <Modal visible = {instructionModalVisibility} animationType='fade' transparent = {true} onRequestClose={instructionValidation} >
                <ImageBackground source={require('../assets/images/halloween.png')} style={{height: '100%', width: '100%'}}>
                <View style={styles.instrcutionModalLayout}>
                  <View style ={styles.instructionModalContext}>
                      <Text style ={styles.instructioModalText}>{displayText[instrcutionCount]}</Text>
                      <TouchableOpacity onPress={changeInstruction}>
                          {instrcutionCount ==6?<Image source={require('../assets/icons/handshake.png')} style={styles.instructionModalImage}/>:null}
                      </TouchableOpacity>
                  </View>
                </View>
                </ImageBackground>
              </Modal>

              <Modal visible={wrongAnswerModal} animationType='fade' transparent={true} onRequestClose={()=>{setWrongAnswerModal(false)}} >
                <View style = {styles.answerModalLayout}> 
                  <View>
                    <Image source={require('../assets/images/wronganswer.png')}/>
                  </View>
                </View>
              </Modal>

              <Modal visible={correctAnswerModal} animationType='fade' transparent={true} onRequestClose={()=>{setWrongAnswerModal(false)}} >
                <View style = {styles.answerModalLayout}> 
                  <View>
                    {celebrate?<Image source={require('../assets/images/correctafter.png')}/>:<Image source={require('../assets/images/correctbefore.png')}/>}
                  </View>
                </View>
              </Modal>

              <Modal visible={dashboardModal} transparent={true} animationType='fade' onRequestClose={()=>{setDashboardModal(true);}}>
                <View style={styles.dashboardModalLayout}>
                    <View style={styles.dashboardModalContent}>
                      <TouchableOpacity onPress={()=>{setDeveloperModal(true)}}>
                       <Image source={require('../assets/icons/profile.png')} style={{marginLeft: '90%' }}/>
                      </TouchableOpacity>
                        {score==10?<Text style={styles.dashboardModalResultText}>WINNER</Text>:<Text style={styles.dashboardModalResultText}>LOSER</Text>}
                        <Text style={styles.dashboardModalSaviourText}>Saviour: {userName}</Text>
                        {score == 10?<Text  style={styles.dashboardModalLifespanText}>Lifespan: Alive</Text> : <Text style={styles.dashboardModalLifespanText}>Lifespan: {score} year </Text>}
                        <Text  style={styles.dashboardModalBoldnessText}>Boldness: {selectDifficulty}</Text>
                        <Text  style={styles.dashboardModalSurvivalText}>Chance Of Survival: {score/totalQestions*100}%</Text>
                        {score==10?<Text  style={styles.dashboardModalLastWordText}>NEVER COMEBACK</Text>:<Text style={styles.dashboardModalLastWordText}>YOU NEVER HAD A CHANCE</Text>}
                        <View style ={styles.dashboardModalButtons}>

                          <TouchableOpacity onPress={playagain}>
                            <Image source={require('../assets/icons/again.png')}/>
                          </TouchableOpacity>
                          
                          <TouchableOpacity>
                            <Link href='/Home'> <Image source={require('../assets/icons/done.png')}/> </Link>
                          </TouchableOpacity> 
                        </View>
                    </View>
                </View>
              </Modal>
              
              <Modal visible={developerModal} transparent={true} animationType='fade' onRequestClose={()=>{setDeveloperModal(true)}}>
                <View style={styles.developerModalLayout}>
                  <View style={styles.developerModalContent}>
                    <Text style={styles.developerModalTitle}>Developed By</Text>
                    <Link href={'https://www.instagram.com/chapaidevraj/'} style={styles.developerModalMember}><Text>Devraj Chapai</Text></Link>
                    <View style={styles.developerModalCloseButton}>
                      <TouchableOpacity onPress={()=>setDeveloperModal(false)}>
                        <Image source={require('../assets/icons/close.png')}></Image>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
              <View>
                  {mistake === 0 ? (
                      <Image source={require('../assets/images/hangman.png')}/>
                          ) : mistake === 1 ? (
                              <Image source={require('../assets/images/hangmanStart.png')} />
                                  ) : mistake === 2 ? (
                                    <Image source={require('../assets/images/hangmanMiddle.png')} />
                                        ) : mistake === 3 ? (
                                          <Image source={require('../assets/images/hangmanEnd.png')} />
                                        ) : <Image source={require('../assets/images/hangmanEnd.png')} />}

                  <View style={styles.guessandscoreContainer}>
                    <View style = {styles.guessanddonebutton}>
                      <TextInput 
                      style={styles.guess}
                      onChangeText={setGuess}
                      value = {guess}
                      editable={false}
                    />
                      <TouchableOpacity onPress={Checkanswer} style = {styles.checkButton}><Text style={styles.checkButtonText}>Check</Text></TouchableOpacity>
                    </View>
                       <Text style={styles.score}> {score} / 10</Text>                
                  </View>
              </View>


              <View style={styles.riddleLayout}> 
                 <Text style={styles.riddleText}>{currentQuestion}</Text>
              </View> 
              
              <View style={styles.keyboardContainer}>
                {Object.values(keyboardKeys).map((key)=>(
                        <TouchableOpacity
                          key={key}
                          onPress={()=>{setGuess(guess+key);}}
                        >
                            <Text style={styles.keys}>{key}</Text>
                        </TouchableOpacity>
                    ))
                }

                <TouchableOpacity style={styles.backspace} onPress={erase} >
                      <Image source={require('../assets/icons/backspace.png')} style={styles.backspace}/>
                  </TouchableOpacity>

              </View>


            
          </View>
      </SafeAreaView>
    </SafeAreaProvider>
    
  )
}

export default Guess

const styles = StyleSheet.create({

  safeArea:{
    display: 'flex',
    flexDirection: 'column',
  },

  instrcutionModalLayout:{
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    
  },


  instructionModalContext:{
    padding: '4%',
    width: 350,
    height: 200,
    maxWidth: 300,
    maxHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
  },

  instructioModalText:{
   fontSize: 25,
   color: 'rgba(204, 23, 23, 0.9)',
   fontWeight: 'bold',
   textAlign: 'center'
  },

  instructionModalImage:{
    height: 50,
    width: 30,
    backgroundColor: 'rgb(145, 57, 123)',
    marginTop: '10%',
    borderRadius: 10,
  },

  answerModalLayout:{
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dashboardModalLayout:{
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dashboardModalContent:{
    padding: 10,
    backgroundColor: 'rgb(11, 192, 147)',
    borderRadius: 10,
    width: 350,
    height: 280,
    gap: 5,
    
  },

  dashboardModalResultText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
  },

  dashboardModalSaviourText:{
    fontSize: 15,
    color: 'blue',
    fontWeight: 'bold',
  },

  dashboardModalLifespanText:{
    fontSize: 15,
    color: 'yellow',
    fontWeight: 'bold',
  },

  dashboardModalBoldnessText:{
    fontSize: 15,
    color: 'gray',
    fontWeight: 'bold',
  },

  dashboardModalSurvivalText:{
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },

  dashboardModalLastWordText:{
    fontSize: 20,
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
  },

  dashboardModalButtons:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },

  developerModalLayout:{
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    
  },

  developerModalContent:{
    backgroundColor: 'rgba(17, 38, 226, 0.95)',
    padding: 20,
    borderRadius: 20,
  },

  developerModalTitle:{
    fontSize: 50,
    color: 'red',
    fontWeight: 'bold',
  },

  developerModalMember:{
    backgroundColor: 'yellow',
    margin: 10,
    fontSize: 20,
    textAlign: 'center',
    borderRadius: 10,
    color: 'blue',
    padding: 5
  },

  developerModalCloseButton:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },


  guessandscoreContainer:{
    position: 'absolute',
    right: 10,
    top: '40%'

  },

  guess:{
    borderColor: 'black',
    paddingLeft: 5,
    width: 130,
    borderRadius: 10,
    color: 'white',
    backgroundColor: 'rgba(223, 21, 21, 0.61)'
  },

  score:{
    fontSize: 24,
    color: 'blue',
    textAlign: 'center'
  },

  guessanddonebutton:{
    display: 'flex',
    flexDirection: 'row'
  },

  checkButton:{
    backgroundColor: 'rgba(28, 211, 171, 0.9)',
    height: 30,
    width: 60,
    borderRadius: 5,
    justifyContent: 'center',
    marginLeft: 7,
    marginTop: '3%'
  },

  checkButtonText:{
    textAlign: 'center',
    color: 'white'
  },

  riddleLayout:{
    marginLeft: 20,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(112, 196, 33, 0.5)',
    borderRadius: 10,
    width: 350,
    height: 30,
  },

  riddleText:{
    textAlign: 'center',
    fontSize: 10,
    color: 'blue'
  },

  keyboardContainer:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    borderRadius: 30,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 2,
    justifyContent: 'center',
    
  },

  keys:{
  fontSize: 7,
  fontWeight: 'bold',
  margin: 5,
  padding: 10,
  borderWidth: 5,
  backgroundColor: '#F0DDC0',
  borderColor: '#F0DDC0',
  borderRadius: 10,
  width: 45,
  height: 40,
  textAlign: 'center',
  },

  backspace:{
    marginLeft: 5,
    maxWidth: 30,
    maxHeight: 40,
  },

}) 
