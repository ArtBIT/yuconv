const yuconv = require("./yuconv");

const cyrillicToLatinCases = [
  { mode: "latin", input: "Здраво", result: "Zdravo" },
  {
    mode: "latin",
    input: "Безалкохолни напитак (кока кола, пепси кола)",
    result: "Bezalkoholni napitak (koka kola, pepsi kola)"
  },
  {
    mode: "latin",
    input: "Становање,вода,струја,гас и друга горива",
    result: "Stanovanje,voda,struja,gas i druga goriva"
  },
  {
    mode: "latin",
    input: "Намештај, опремање домаћинства и одрж.",
    result: "Nameštaj, opremanje domaćinstva i održ."
  },
  {
    mode: "latin",
    input: `Министарство просвете, науке и технолошког развоја
Министарство просвете, науке и технолошког развоја надлежно је за планирање и развој предшколског, основног, средњег и високог образовања и ученичког и студентског стандарда. Министарство брине о образовању надарених ученика и студената, али и  о инклузивном образовању. Кроз мрежу допунских школа стара се о допунском образовању деце наших држављана у иностранству.`,
    result: `Ministarstvo prosvete, nauke i tehnološkog razvoja
Ministarstvo prosvete, nauke i tehnološkog razvoja nadležno je za planiranje i razvoj predškolskog, osnovnog, srednjeg i visokog obrazovanja i učeničkog i studentskog standarda. Ministarstvo brine o obrazovanju nadarenih učenika i studenata, ali i  o inkluzivnom obrazovanju. Kroz mrežu dopunskih škola stara se o dopunskom obrazovanju dece naših državljana u inostranstvu.`
  }
];
const latinToCyrillicCases = [
  {
    mode: "cyrillic",
    input: `Školske uprave pružaju podršku ustanovama u razvojnom planiranju, samovrednovanju, razvoju predškolskog, školskog i vaspitnog programa i osiguranju kvaliteta obrazovanja. One učestvuju u pripremama plana razvoja obrazovanja i vaspitanja i prate njegovo ostvarivanje na području za koje su zadužene.`,
    result: `Школске управе пружају подршку установама у развојном планирању, самовредновању, развоју предшколског, школског и васпитног програма и осигурању квалитета образовања. Оне учествују у припремама плана развоја образовања и васпитања и прате његово остваривање на подручју за које су задужене.`
  },
  {
    mode: "cyrillic",
    result: `Дигитализација у образовању један је од стратешких циљеве Владе Републике Србије. Она се имплементира кроз три основне активности:

    Изградњу људских и институционалних капацитета;
    Опремање школа ИКТ инфраструктуром и њихово повезивање на интернет;
    Креирање и успостављање електронских сервиса (ЈИСП, Ес-Дневник, дигитални уџбеници…).

Све три наведене активности садрже бројне подактивности које, синхронизовано имплементиране, омогућавају додатне прилике за учење и унапређују образовно искуство ученика.`,
    input: `Digitalizacija u obrazovanju jedan je od strateških ciljeve Vlade Republike Srbije. Ona se implementira kroz tri osnovne aktivnosti:

    Izgradnju ljudskih i institucionalnih kapaciteta;
    Opremanje škola IKT infrastrukturom i njihovo povezivanje na internet;
    Kreiranje i uspostavljanje elektronskih servisa (JISP, Es-Dnevnik, digitalni udžbenici…).

Sve tri navedene aktivnosti sadrže brojne podaktivnosti koje, sinhronizovano implementirane, omogućavaju dodatne prilike za učenje i unapređuju obrazovno iskustvo učenika.`
  }
];

const errorCases = [
  { mode: "latinica", input: "Здраво" },
  { mode: "unknown", input: "does not matter" }
];

describe("YuConv", () => {
  test.each(cyrillicToLatinCases)(
    "Transliteration from Cyrillic To Latin - Case %#",
    ({ mode, input, result }) => {
      expect(yuconv(input, mode)).toEqual(result);
    }
  );
  test.each(latinToCyrillicCases)(
    "Transliteration from Latin to Cyrillic - Case %#",
    ({ mode, input, result }) => {
      expect(yuconv(input, mode)).toEqual(result);
    }
  );
  test.each(errorCases)("Error Case %#", ({ mode, input }) => {
    function errorWrapper() {
      yuconv(input, mode);
    }
    expect(errorWrapper).toThrow();
  });
});
