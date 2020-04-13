const constants = {
  errors: {
    NO_USER: 'Пользователь с данным id не найден.',
    NO_DOC: 'Документ с данным id не найден.',
    DUPL_EMAIL: 'Пользователь с таким email уже зарегистрирован.',
    AUTHORIZATION_ERROR: 'Неправильная почта или пароль.',
    NO_RIGHTS_DOC: 'У вас нет прав на изменение данного документа.',
    NOT_FOUND: 'Запрашиваемый ресурс не найден.',
    NO_AUTH: 'Необходима авторизация!',
  },
};

module.exports = Object.freeze(constants);
