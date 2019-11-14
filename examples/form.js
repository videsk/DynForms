const random = () => Math.random().toString(36).substring(7);

const form1 = [
  {
    type: 'input',
    id: `name${random()}`,
    label: 'Name',
    placeholder: 'Write your name here',
    attr: {
      class: 'test',
    },
    helps: {
      label: 'This is your name',
    }
  },
  {
    type: 'textarea',
    id: `life${random()}`,
    label: 'About your life',
    attr: {
      class: 'test',
      placeholder: 'Write about your life...',
    },
    helps: {
      label: 'Write about your life',
    },
  },
];

const form2 = [
  {
    type: 'select',
    id: `country${random()}`,
    label: 'Country',
    attr: {
      class: 'test',
    },
    options: [
      { label: 'EEUU', value: 'US' },
      { label: 'Chile', value: 'CL' },
      { label: 'Germany', value: 'DE' },
    ],
    helps: {
      label: 'Select your country',
    }

  },
  {
    type: 'select',
    id: `country${random()}`,
    label: 'Country',
    attr: {
      class: 'test',
      filterable: '',
    },
    options: [
      { label: 'EEUU', value: 'US' },
      { label: 'Chile', value: 'CL' },
      { label: 'Germany', value: 'DE' },
    ],
    helps: {
      label: 'Select your second country',
    }
  },
];

const form3 = [
  {
    type: 'multiple',
    id: `color${random()}`,
    label: 'Color',
    attr: {
      class: 'test',
    },
    options: [
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' },
      { label: 'Black', value: 'black' },
    ],
    helps: {
      label: 'Select your favorite color',
    }
  },
  {
    type: 'multiple',
    id: `color${random()}`,
    label: 'Color',
    attr: {
      class: 'test',
      filterable: '',
    },
    options: [
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' },
      { label: 'Black', value: 'black' },
    ],
    helps: {
      label: 'Select your second favorite color',
    }
  },
];

const form4 = [
  {
    type: 'radio',
    id: `gender${random()}`,
    label: 'Gender',
    attr: {
      class: 'test',
    },
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
    ],
    helps: {
      label: 'Select your gender',
    }
  },
];

const form5 = [
  {
    type: 'checkbox',
    id: `pet${random()}`,
    label: 'Pet',
    attr: {
      class: 'test',
    },
    options: [
      { label: 'Cat', value: 'cat' },
      { label: 'Dog', value: 'dog' },
      { label: 'Bird', value: 'bird' },
    ],
    helps: {
      label: 'Select your favorite pet',
    }
  },
];

const form6 = [
  {
    type: 'rate',
    id: `satisfaction${random()}`,
    label: 'Satisfaction',
    icon: 'star',
    attr: {
      class: 'test',
    },
    options: [
      { label: 'Very good', value: '5' },
      { label: 'Good', value: '4' },
      { label: 'Indifferent', value: '3' },
      { label: 'Not bad', value: '2' },
      { label: 'Bad', value: '1' },
    ],
    helps: {
      label: 'How much satisfied are you with DynForms?',
    }
  },
  {
    type: 'rate',
    id: `satisfaction${random()}`,
    label: 'Satisfaction',
    icon: 'heart',
    attr: {
      class: 'test',
      clearable: '',
    },
    options: [
      { label: 'I love it!', value: '5' },
      { label: 'Much', value: '4' },
      { label: 'Indifferent', value: '3' },
      { label: 'Maybe', value: '2' },
      { label: 'Nothing', value: '1' },
    ],
    helps: {
      label: 'How much do you love DynForms?'
    }
  }
];

const form7 = [
  {
    type: 'input',
    id: `name${random()}`,
    label: 'Name',
    placeholder: 'Write your name here',
    attr: {
      class: 'test',
    },
    helps: {
      label: 'This is your name',
    }
  },
  {
    type: 'textarea',
    id: `life${random()}`,
    label: 'About your life',
    attr: {
      class: 'test',
      placeholder: 'Write about your life...',
    },
    helps: {
      label: 'Write about your life',
    },
  },
  {
    type: 'select',
    id: `country${random()}`,
    label: 'Country',
    attr: {
      class: 'test',
    },
    options: [
      { label: 'EEUU', value: 'US' },
      { label: 'Chile', value: 'CL' },
      { label: 'Germany', value: 'DE' },
    ],
    helps: {
      label: 'Select your country',
    }
  },
  {
    type: 'multiple',
    id: `color${random()}`,
    label: 'Color',
    attr: {
      class: 'test',
    },
    options: [
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' },
      { label: 'Black', value: 'black' },
    ],
    helps: {
      label: 'Select your favorite color',
    }
  },
  {
    type: 'radio',
    id: `gender${random()}`,
    label: 'Gender',
    attr: {
      class: 'test',
    },
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
    ],
    helps: {
      label: 'Select your gender',
    }
  },
  {
    type: 'checkbox',
    id: `pet${random()}`,
    label: 'Pet',
    attr: {
      class: 'test',
    },
    options: [
      { label: 'Cat', value: 'cat' },
      { label: 'Dog', value: 'dog' },
      { label: 'Bird', value: 'bird' },
    ],
    helps: {
      label: 'Select your favorite pet',
    }
  },
  {
    type: `rate`,
    id: `satisfaction${random()}`,
    label: 'Satisfaction',
    icon: 'star',
    attr: {
      class: 'test',
    },
    options: [
      { label: 'Very good', value: '5' },
      { label: 'Good', value: '4' },
      { label: 'Indifferent', value: '3' },
      { label: 'Not bad', value: '2' },
      { label: 'Bad', value: '1' },
    ],
    helps: {
      label: 'How much satisfied are you?',
    }
  }
];

const options = {
  container: document.querySelector('#main-form'),
  debug: true,
};
