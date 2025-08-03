/// USER VALIDATOR

export const validateUserName = (userName: string):string | null => {
    if(!userName.trim()){
        return ('Пожалуйста, введите имя для вашего аккаунта')
    }

    if(userName.length < 3){
        return (`Имя аккаунта должно содержать минимум 3 символов (сейчас ${userName.length})`)
    }

    if(userName.length > 15){
        return (`Имя аккаунта может содержать максимум 15 символов (сейчас ${userName.length})`)
    }

    const userNameRegex = /^[a-zA-Z0-9!@#$%^&*.]$/;
    if(!userNameRegex.test(userName)) {
        return ('Имя аккаунта может содержать только латинские буквы, цифры и некоторые спец.символы')
    }

    return null;
}

export const validateUserEmail = (email: string): string | null => {
    if (!email.trim()){
        return ('Пожалуйста, введите ваш email');
    }

    return null;
};

export const validateUserPassword = (password: string):string | null => {
    if (!password.trim()){
        return ('Пожалуйста, введите ваш пароль');
    }

    if (password.length < 8)  {
        return (`Пароль должен содержать минимум 8 символов (сейчас ${password.length})`);
    }

    if (password.length > 25){
        return (`Пароль может быть максимум 25 символов (сейчас ${password.length})`);
    }

    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*.]+$/;
    if(!passwordRegex.test(password)) {
        return ('Пароль может содержать только латинские буквы, цифры и некоторые спец.символы')
    }
    return null;
}

export const validateConfirmPassword = (password:string, confirmPassword:string):string | null => {
    if (!password.trim()){
        return ('Пожалуйста, подтвердите ваш пароль');
    }

    if (password != confirmPassword){
        return ('Пароль не совпадает с тем, что вы ввели ранее')
    }

    return null;
}


/// ADD NEW KEY VALIDATORS

export const validateNewKeyName = (gameName: string): string | null => {
    if (!gameName.trim()) {
        return "Пожалуйста, введите название игры.";
    }

    if (gameName.length < 3 || gameName.length > 35) {
        return `Название игры должно содержать от 3 до 35 символов (сейчас ${gameName.length}).`;
    }

    const gameNameCheckRegex = /^[A-Za-z0-9:,\s]+$/;
    if (!gameNameCheckRegex.test(gameName)) {
        return "Название игры может содержать только латинские буквы, цифры и некоторые спец.символы.";
    }

    return null;
};

export const validateNewKeyPrice = (gamePrice: string): string | null => {
    if (!gamePrice.trim()) {
        return "Пожалуйста, введите цену игры.";
    }

    const gamePriceCheckRegex = /^[0-9]+$/;
    if (!gamePriceCheckRegex.test(gamePrice)) {
        return "Цена может содержать только цифры.";
    }

    return null;
};

export const validateNewKeyReleaseData = (releaseData: string): string | null => {
    if (!releaseData.trim()) {
        return "Пожалуйста, введите дату релиза игры.";
    }

    return null;
};

export const validateNewKeyImageUrl = (imageUrl: string): string | null => {
    if (!imageUrl.trim()) {
        return "Пожалуйста, введите название игры.";
    }

    const imageUrlCheckRegex = /^[A-Za-z0-9:,/;]+$/;
    if (!imageUrlCheckRegex.test(imageUrl)) {
        return "Cсылка может содержать только латинские буквы, цифры и некоторые спец.символы.";
    }

    return null;
};

export const validateNewKeyDeveloper = (developer: string): string | null => {
    if (!developer.trim()) {
        return "Пожалуйста, укажите имя разработчика игры.";
    }

    if (developer.length < 3 || developer.length > 20) {
        return `Имя разработчика должно содержать от 3 до 20 символов (сейчас ${developer.length}).`;
    }

    const developerCheckRegex = /^[A-Za-z0-9:,\s]+$/;
    if (!developerCheckRegex.test(developer)) {
        return "Имя разработчика может содержать только латинские буквы, цифры и некоторые спец.символы.";
    }

    return null;
};

export const validateNewKeyPublisher = (publisher: string): string | null => {
    if (!publisher.trim()) {
        return "Пожалуйста, укажите имя издателя игры.";
    }

    if (publisher.length < 3 || publisher.length > 20) {
        return `Имя издателя должно содержать от 3 до 20 символов (сейчас ${publisher.length}).`;
    }

    const publisherCheckRegex = /^[A-Za-z0-9:,\s]+$/;
    if (!publisherCheckRegex.test(publisher)) {
        return "Имя издателя может содержать только латинские буквы, цифры и некоторые спец.символы.";
    }

    return null;
};

export const validateNewKeyDescription = (description: string): string | null => {
    if (!description.trim()) {
        return "Пожалуйста, укажите описание игры.";
    }

    if (description.length < 10 || description.length > 600) {
        return `Описание должно содержать от 10 до 600 символов (сейчас ${description.length}).`;
    }

    const descriptionCheckRegex = /^[A-Za-zА-Яа-я0-9:,/.;\s\-()?!"']+$/;
    if (!descriptionCheckRegex.test(description)) {
        return "Описание может содержать только латиницу, кириллицу, цифры и некоторые спец.символы.";
    }

    return null;
};

export const validateNewKeyGenres = (genres: any): string | null => {
    if (genres.length < 3 || genres.length > 6) {
        return `Количество выбранных жанров должно быть от 3 до 6.`;
    }

    return null;
};

export const validateNewKeyApplications = (applications: any): string | null => {
    if (applications.length === 0) {
        return `Выберете хотя бы один способ активации.`;
    }

    return null;
};

export const validateNewKeyPlatforms = (platforms: any): string | null => {
    if (platforms.length === 0) {
        return `Выберете хотя бы одну платформу.`;
    }

    return null;
};

/// STAM BALANCE VALIDATORS

export const validateSteamLogin = (steamLogin:string): string | null => {
    if (!steamLogin.trim()) {
        return `Пожалуйста, введите логин от Steam аккаунта`;
    }

    const nameCheckRegex = /^[a-zA-Z0-9_]+$/;
    if(!nameCheckRegex.test(steamLogin)) {
        return (`Логин может содержать только латинские буквы, цифры и нижнее подчёркивание`)
    }

    if (steamLogin.length < 3) {
        return (`Длинна логина должна содержать минимум 3 символа (сейчас ${steamLogin.length})`)
    }

    if (steamLogin.length > 35) {
        return (`Длинна логина может содержать максимум 35 символов (сейчас ${steamLogin.length})`)
    }

    return null;
}

export const validateSteamBalance = (steamBalance:string): string | null => {
    if (!steamBalance.trim()) {
        return `Пожалуйста, введите желаемую сумму пополнения аккаунта`;
    }

    const balanceCheckRegex = /^[0-9]+$/;
    if(!balanceCheckRegex.test(steamBalance)) {
        return (`Сумма пополнения должна содержать только цифры`)
    }


    if (Number(steamBalance) < 100 ) {
        return (`Минимальная сумма пополнения 100`)
    }

    if (Number(steamBalance) > 100000) {
        return (`Максимальная сумма пополнения 100.000`)
    }

    return null;
}

export const validatePromoCode = (promoCode:string): string | null => {
    const promoCodeCheckRegex = /^[a-zA-Z0-9]*$/;
    if(!promoCodeCheckRegex.test(promoCode)) {
        return (`Промокод может содержать только латинские буквы и цифры`)
    }

    if( !(promoCode == '') ){
        if (promoCode.length < 3) {
            return (`Промокод должен содержать минимум 3 символа (сейчас ${promoCode.length})`)
        }
    }

    if( !(promoCode == '') ){
        if (promoCode.length > 35) {
            return (`Промокод может содержать макстмум 35 символов (сейчас ${promoCode.length})`)
        }
    }
    return null;
}