export const addMemberStyle = StyleSheet.create({
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    container: {
      flex: 0.9,
      padding:20,
    },
    headerContainer:{
      marginTop:40,
      marginBottom:20,
      // justifyContent:'',
      flexDirection:'row',
    },
    BodyContainer:{
      flex:1,
      borderRadius:20,
      padding:20,
      backgroundColor:"white",
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    }
  });