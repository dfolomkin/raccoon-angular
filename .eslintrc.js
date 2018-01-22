module.exports = {
  "extends": "airbnb-base",
  "rules": {
    "linebreak-style": ["error",
      "windows"
    ],
    "no-param-reassign": ["error",
      {
        "props": false
      }
    ],
    "comma-dangle": ["error",
      "never"
    ],
  },
  "env": {
    "browser": true,
    "node": true
  }
};