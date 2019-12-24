/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const blacklist = require('metro-config/src/defaults/blacklist');

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },

  resolver: {
    // Change 2 (add 'bin' to assetExts)
    assetExts: ['bin', 'txt', 'jpg'],
    sourceExts: ['js', 'json', 'ts', 'tsx', 'jsx'],
    // Change 3 (add platform_node to blacklist)
    blacklistRE: blacklist([/platform_node/])
  },
};
