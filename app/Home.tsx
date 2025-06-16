import { useAudioPlayer } from 'expo-audio';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, Modal, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const home = () => {

    const dropdownData = [
        { label: 'EASY', value: 'easy'}, 
        { label: 'MID', value: 'mid' },
        { label: 'HARD', value: 'hard'},
    ];

    const [userNameModalVisibility, setUserNameModalVisibility] = useState(true);
    const [settingModal, setSettingModal] = useState(false);
    const [music, setMusic] = useState(false);
    const [audio, setAudio] = useState(true); 
    const [userName, setUserName] = useState('NONE');
    const [selectDifficulty, setSelectDifficulty] = useState(null);
    const [dropdownonFocus, setDropdownonFocus] = useState(false);
    const [passingDoor, setPassingDoor] = useState(false);
    const [doorText, setDoorText] = useState("");

    const musicSource = require('../assets/sounds/homebackground.wav');
    const musicPlayer = useAudioPlayer(musicSource);

    const settingAudio = require('../assets/sounds/settingbutton.wav');
    const settingAudioPlayer = useAudioPlayer(settingAudio); 

    const ouchAudio = require("../assets/sounds/ouch.wav");
    const ouchAudioPlayer = useAudioPlayer(ouchAudio);

    const dooropenAudio = require("../assets/sounds/dooropening.wav");
    const dooropenPlayer = useAudioPlayer(dooropenAudio);

    const mechincalbuttonAudio = require("../assets/sounds/mechinicalbutton.mp3");
    const mechinicalbuttonAudioPlayer = useAudioPlayer(mechincalbuttonAudio);

    const dropdownAudio = require('../assets/sounds/dropdown.wav');
    const dropdownAudioPlayer = useAudioPlayer(dropdownAudio);

    const keypressAudio = require('../assets/sounds/keypress.wav');
    const keypressAudioPlayer = useAudioPlayer(keypressAudio);


    let  userNameValidation = () =>{
        if(userName.toUpperCase() != 'NONE' && userName != ''){
            Alert.alert("Username is updated to " + userName.toUpperCase())
            setUserNameModalVisibility(false);
        }else{
            Alert.alert("Choose a Username");
            setUserNameModalVisibility(true);
        }
    }

    const musicSetting = () =>{
        audioPlayer('settingButton');
        setMusic(!music);
        music?musicPlayer.pause():musicPlayer.play();
    }

    const audioPlayer = (currentAudio:string)=>{
        if(currentAudio != '' && audio == true){
            switch(currentAudio){
                case 'ouch':
                    ouchAudioPlayer.play();
                    break;
                
                case 'dooropen':
                    dooropenPlayer.play();
                    break;

                case 'settingButton':
                    settingAudioPlayer.play();
                    break;

                case 'mechanicalbutton':
                    mechinicalbuttonAudioPlayer.play();
                    break;

                case 'dropdownbackgroundplay':
                    dropdownAudioPlayer.play();
                    break;

                case 'keypress':
                    keypressAudioPlayer.play();
                    
                default:
                    break;

            }
        }
    }

    const checkdoor = () =>{
        if(!passingDoor){
            Alert.alert("Door is closed. Can't get through. Choose difficulty to get in !!!");
        }
    }


    useEffect (()=>{
        if(passingDoor){audioPlayer('dooropen');} 
        passingDoor?setDoorText('ENTER !!!'):setDoorText('ENTRY BLOCKED !!!')
    });
    useEffect(()=>{
       musicSetting();
       if(passingDoor){audioPlayer('dooropen');} 
    },[]);

     useEffect(()=>{
         if(dropdownonFocus){
             audioPlayer('dropdownbackgroundplay');
         }
         selectDifficulty == null ? setPassingDoor(false) : setPassingDoor(true);
            
     },[selectDifficulty]);

     useEffect(()=>{
        audioPlayer('keypress');
     },[userName])


  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.layout}>
        <Modal visible={userNameModalVisibility} transparent={true} animationType='fade' onRequestClose={userNameValidation}>
            <View style={styles.userModalLayout}>
                <View style={styles.userModalContent}>
                    <Text style={styles.userModalText}>ENTER YOUR NAME</Text>
                    <TextInput 
                        style={styles.userModalTextInput}
                        onChangeText={setUserName}
                        value={userName}
                    />
                    <Button title="Update" onPress={userNameValidation}/>
                </View>
            </View>
        </Modal>

        <Modal visible={settingModal} transparent={true} animationType='fade' onRequestClose={()=>{setSettingModal(false)}}>
            <View style={styles.settingModalLayout}>
                <View style={styles.settingModalContent}>
                    <TouchableOpacity onPress={()=>{setAudio(!audio); audioPlayer('settingButton')}}>{audio?<Image source={require('../assets/icons/audioPlay.png')}/>:<Image source={require('../assets/icons/audioMute.png')}/>}</TouchableOpacity>
                    <TouchableOpacity onPress={musicSetting}>{music?<Image source={require('../assets/icons/musicPlay.png')}/>:<Image source={require('../assets/icons/musicMute.png')}/>}</TouchableOpacity>
                </View>    
            </View>
        </Modal>

        <StatusBar 
            animated = {true}
            backgroundColor= 'white'
            barStyle= 'dark-content'
            hidden= {false}
        />

            <View >
                <TouchableOpacity onPress={()=>{setSettingModal(!settingModal); audioPlayer('mechanicalbutton')}}>
                    <Image source={require('../assets/icons/setting.png')}  style={styles.settingImage}/>
                </TouchableOpacity>
            </View>

            <View>
               <Text style={styles.saviourText}>SAVIOUR</Text>
               <Text style={styles.saviourName}>{userName.toUpperCase()}</Text>
            </View>

            <View>
               <TouchableOpacity onPress={()=>{audioPlayer('ouch')}}>
                    <Image source={require('../assets/images/logo.png')} style={styles.logoImage}/>
                </TouchableOpacity>
            </View>

            <View>
                <Text style={styles.doorTextStyle}>{doorText}</Text>
               <TouchableOpacity onPress={checkdoor} style={styles.doorimageLayout}> 
                <Link href={{
                        pathname: '/Guess',
                        params: {
                                userName,
                                selectDifficulty,
                                music:music.toString(),
                                audio:audio.toString(),
                        },
                    }}  disabled = {!passingDoor}>{passingDoor?<Image source={require('../assets/images/opendoor.png')}/> : <Image source={require('../assets/images/closedoor.png')}/> }</Link>
               </TouchableOpacity>
            </View>

            <View style = {styles.dropdownLayout}>
               <Dropdown
               style = {styles.dropdownContent} 
                    mode='modal'
                    placeholder='CHOOSE DIFFICULTY'
                    placeholderStyle = {styles.dropdownPlaceholder}
                    selectedTextStyle={styles.dropdownSelectedText}
                    containerStyle = {styles.dropdownCotainer}
                    itemContainerStyle = {styles.dropdownItemContainer}
                    itemTextStyle = {styles.dropdownText}
                    data={dropdownData}
                    labelField= 'label'
                    valueField= 'value'
                    value={selectDifficulty}
                    onFocus={()=>{setDropdownonFocus(true)}}
                    onChange={(item) =>{
                        setSelectDifficulty(item.value);
                    }}
               />
            </View>
        </SafeAreaView>
    </SafeAreaProvider>
    
  )
}

export default home

const styles = StyleSheet.create({
    layout:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexWrap: 'wrap',
        backgroundColor: 'rgb(219, 218, 171)',
        height: '100%',
        width: '100%'
    },

    userModalLayout:{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center', 
        display: 'flex',
    },

    userModalContent:{
        backgroundColor: 'rgba(153, 83, 71, 0.7)',
        padding: 20,
        borderRadius: 10,
        width: '70%',
        height: '25%',
    },

    userModalText:{
        marginTop: 20,
        color: 'rgb(255, 255, 255)',
        fontWeight: 'bold'
    },


    userModalTextInput:{
        color: 'rgb(5, 29, 240)',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingLeft: 10,
        marginTop: 5,
        marginBottom: 10,
    },


    settingModalLayout:{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    },

    settingModalContent:{
        padding: 15,
        margin: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
        backgroundColor: 'rgba(226, 230, 25, 0.5)',
        borderRadius: '10%',
        
        
    },

    settingImage:{
        position: 'relative',
        height: 40,
        width: 40, 
        top: -40,
        left: '100%',
        backgroundColor: 'rgba(39, 86, 187, 0.5)',
        borderRadius: 10, 
        borderColor: 'rgba(255, 238, 3, 0.9)',
    },

    saviourText:{
        color: 'rgb(117, 43, 43)',
        fontWeight: 'bold',
        fontSize: 50,
        top: -10,
        textAlign: 'center',
        
    },

    saviourName:{
        color: 'rgb(52, 53, 151)',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        
        
    },

    logoImage:{
        position: 'relative',
        height: 300,
        width: 300,
        marginLeft: 20,
    },

    doorTextStyle:{
        textAlign: 'center',
        marginTop: 5,
        fontWeight: '900',
        color: 'rgba(184, 47, 47, 0.9)',
    },

    doorimageLayout:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    dropdownLayout: {
        marginTop: 20, 
        width: '60%',
        alignSelf: 'center', 
        height: 50,
        display: 'flex', 
    },

    dropdownContent:{
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.0)',
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(202, 170, 170, 0.9)',
        
    },

    dropdownPlaceholder:{
        fontWeight: 'bold',
        color: 'rgba(247, 8, 8, 0.9)',
        textAlign: 'center',
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },

    dropdownSelectedText:{
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        fontSize: 20,
        borderColor: 'white'
    },

    dropdownCotainer:{
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },

    dropdownItemContainer:{
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        margin: 2,
    },

    dropdownText:{
        textAlign: 'center',
        fontSize: 20,
        padding: 2,
        borderRadius: 10,
        color: 'gray'
    },
})