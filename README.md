# YuConv
![Travis CI](https://img.shields.io/travis/artbit/yuconv/master)
![GitHub issues badge](https://img.shields.io/github/issues/ArtBIT/yuconv)
![GitHub forks badge](https://img.shields.io/github/forks/ArtBIT/yuconv)
![GitHub stars badge](https://img.shields.io/github/stars/ArtBIT/yuconv)
![GitHub license badge](https://img.shields.io/github/license/ArtBIT/yuconv)
![Twitter badge](https://img.shields.io/twitter/url?url=https%3A%2F%2Fgithub.com%2FArtBIT%2Fyuconv)


### Šta je ovo?

YuConv je jednostavna bilblioteka za kovertovanje srpskog ćiriličnog teksta u latinični i obratno.

Ukoliko vam je potrebno konvertovanje iz komandne linije, pogledajte [YuConv-cli](https://github.com/ArtBIT/yuconv-cli)

---

### Instalacija

#### NPM

    $ npm install yuconv
    
#### Yarn

    $ yarn global add yuconv

---

### Primeri korišćenja

#### Konvertuj tekst iz latiničnog u ćirilično pismo

    const yuconv = require('yuconv');

    console.log(yuconv("Zdravo", "cyrillic"));
    // Здраво

#### Konvertuj tekst iz ćiriličnog u latinično pismo

    const yuconv = require('yuconv');

    console.log(yuconv("Здраво", "latin"));
    // Zdravo

# Licenca
MIT
