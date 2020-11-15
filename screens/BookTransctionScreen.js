import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View ,Image} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import { TextInput } from 'react-native-gesture-handler';

export default class BookTransctionScreen extends  React.Component{

constructor(){
    super()
    this.state={
        hasCameraPermission:null,
        scanned:false,
        scannedData:'',
        buttonState:'normal',
        scannedBookID:'',
        scannedStudentID:''
    }
}

getCameraPermission = async(id)=>{
const {status}=await Permissions.askAsync(Permissions.CAMERA)
this.setState({hasCameraPermission:status==='granted',buttonState:id,scanned:false})
}

handleBarcodeScanner=async({type,data})=>{
    const{buttonState}=this.state
    if(buttonState==='bookID'){
        this.setState({
            scanned:true,
            buttonState:'normal',
            scannedBookId:data,               
        })
    }
    else if (buttonState==='studentID'){
        this.setState({
            scanned:true,
            buttonState:'normal',
            scannedStudentID:data,               
        })
    }
}
    render(){
        
const hasCameraPermissions=this.state.hasCameraPermission;

const scanned = this.state.scanned

const button = this.state.buttonState
console.log(button)
if (button!=='normal'&& hasCameraPermissions) {
return(
    <BarCodeScanner
    onBarCodeScanned={scanned? undefined:this.handleBarcodeScanner}
    style={StyleSheet.absoluteFillObject}
    />
)
}
else if (button==='normal'){
    return (
        <View style={styles.container}>       
<View>
<Image
      source={require('../assets/booklogo.jpg')}
      style={{width:200,height:200}}
      />
      <Text style={{textAlign:'center' ,fontSize:30}}>    WILY  </Text>

</View>

          <View style={styles.inputView}> 

                <TextInput style={styles.inputbox}
                placeholder='enter book ID'
                value={this.state.scannedBookID}
                />
                <TouchableOpacity style={styles.scanButton}
                onPress={()=>{
                    this.getCameraPermission('bookID')
                }}
                >
                <Text style={styles.buttonText}
                scan book
                />
                </TouchableOpacity>
         </View>
         <View style={styles.inputView}> 

        <TextInput style={styles.inputbox}
        value={this.state.scannedStudentID}
        placeholder='enter Student ID'
        />
        <TouchableOpacity style={styles.scanButton}
         onPress={()=>{
            this.getCameraPermission('studentID')
        }}
        >
        <Text style={styles.buttonText}
        scan Student ID
        />
        </TouchableOpacity>
        </View>
     </View>
    )
    }
    }
    }

const styles = StyleSheet.create({
canButton:{ backgroundColor: '#2196F3',padding: 10, margin: 10},
buttonText:{fontSize:20},
container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
displayText:{ fontSize: 15, textDecorationLine: 'underline' },
inputView:{ flexDirection: 'row', margin: 20 }, 
inputBox:{ width: 200, height: 40, borderWidth: 1.5, borderRightWidth: 0, fontSize: 20 }, 
scanButton:{ backgroundColor: '#66BB6A', width: 50, borderWidth: 1.5, borderLeftWidth: 0 }
})