export type Translation = {
  logo: string;
  home: {
    hero: {
      title: string;
      description: string;
      orderNow: string;
      learnMore: string;
    };
    bestSeller: {
      checkOut: string;
      OurBestSellers: string;
    };
    about: {
      ourStory: string;
      aboutUs: string;
      descriptions: {
        one: string;
        two: string;
        three: string;
      };
    };
    contact: {
      DontHesitate: string;
      contactUs: string;
    };
  };
  navbar: {
    home: string;
    about: string;
    menu: string;
    contact: string;
    login: string;
    register: string;
    signOut: string;
    profile: string;
    admin: string;
  };
  auth: {
    login: {
      title: string;
      name: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      password: { label: string; placeholder: string };
      submit: string;
      authPrompt: { message: string; signUpLinkText: string };
    };
    register: {
      title: string;
      name: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      password: { label: string; placeholder: string };
      confirmPassword: { label: string; placeholder: string };
      submit: string;
      authPrompt: { message: string; loginLinkText: string };
    };
  };
  validation: {
    nameRequired: string;
    validEmail: string;
    passwordMinLength: string;
    passwordMaxLength: string;
    confirmPasswordRequired: string;
    passwordMismatch: string;
  };
  messages: {
    userNotFound: string;
    incorrectPassword: string;
    loginSuccessful: string;
    unexpectedError: string;
    userAlreadyExists: string;
    accountCreated: string;
    updateProfileSucess: string;
  };
  menuItem: { addToCart: string };
  profile: {
    title: string;
    form: {
      name: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      phone: {
        label: string;
        placeholder: string;
        validation: { required: string };
      };
      address: {
        label: string;
        placeholder: string;
        validation: { required: string };
      };
      postalCode: {
        label: string;
        placeholder: string;
        validation: { required: string };
      };
      city: {
        label: string;
        placeholder: string;
        validation: { required: string };
      };
      country: {
        label: string;
        placeholder: string;
        validation: { required: string };
      };
    };
  };
  admin: {
    tabs: {
      profile: string;
      categories: string;
      menuItems: string;
      users: string;
      orders: string;
    };
    categories: {
      form: {
        editName: string;
        name: {
          label: string;
          placeholder: string;
          validation: { required: string };
        };
      };
    };
    menuItems: {
      createNewMenuItem: string;
      addItemSize: string;
      addExtraItem: string;
      menuOption: { name: string; extraPrice: string };
      form: {
        name: {
          label: string;
          placeholder: string;
          validation: { required: string };
        };
        description: {
          label: string;
          placeholder: string;
          validation: { required: string };
        };
        basePrice: {
          label: string;
          placeholder: string;
          validation: { required: string };
        };
        category: { validation: { required: string } };
        image: { validation: { required: string } };
      };
    };
  };
  category: string;
  save: string;
  edit: string;
  delete: string;
  cancel: string;
  sizes: string;
  extrasIngredients: string;
  create: string;
  cart: { title: string; noItemsInCart: string };
  copyRight: string;
  noProductsFound: string;
  noCategoriesFound: string;
};
