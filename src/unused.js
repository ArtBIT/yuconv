function guessTextVariant(text) {
  text = text.trim();
  if (text.length < 3) {
    return "auto";
  }

  const cyrillicCount = (
    text.match(
      /[абвгдђежзијклљмнњопрстћуфхцџчшАБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ]/gu
    ) || []
  ).length;
  const latinCount = (
    text.match(
      /[abcčćdžđefghijklmnoprsštuvzABCČĆDŽĐEFGHIJKLMNOPRSŠTUVZwqxyWQXY]/gu
    ) || []
  ).length;

  if (cyrillicCount > latinCount) {
    return "auto-cyrillic";
  }

  const diacriticsCount = (text.match(/[šđčćžŠĐČĆŽ]/gu) || []).length;
  if (diacriticsCount === 0) {
    const yusciiCharactersCount = (text.match(/[\^~\]\}\\\|\[\{@`]/gu) || [])
      .length;

    if (yusciiCharactersCount > 0) {
      const yusciiCyrillicCount = (text.match(/[wxqWXQ]/gu) || []).length;

      return yusciiCyrillicCount > 0
        ? "auto-yuscii-cyrillic"
        : "auto-yuscii-latin";
    }

    const possibleDiacriticsCount = (text.match(/[sczSCZ]|dj|Dj|DJ/gu) || [])
      .length;
    if (possibleDiacriticsCount > 0) {
      return "auto-ascii";
    }
  }

  return "auto-latin";
}
