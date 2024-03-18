
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],

  // add the below line 
  plugins: ["nativewind/babel",'react-native-reanimated/plugin'], 
 // this should be always last line
};