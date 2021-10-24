import React from 'react';
import { Link } from 'gatsby';
import { LangCode } from './locales';

type ReactString = string | JSX.Element;
type TitleToString = Record<string, ReactString>;
type TitleToStringArray = Record<string, ReactString[]>;
type MultilangString = Record<LangCode, TitleToString>;
type MultilangStringArray = Record<LangCode, TitleToStringArray>;

const StringEnFr = (
  key: string,
  en: ReactString,
  fr: ReactString
): MultilangString => {
  return {
    ['en']: {
      [key]: en,
    },

    ['fr']: {
      [key]: fr,
    },
  };
};

const stringEnFrArray = (
  key: string,
  en: ReactString[],
  fr: ReactString[]
): MultilangStringArray => {
  return {
    ['en']: {
      [key]: en,
    },

    ['fr']: {
      [key]: fr,
    },
  };
};

const languageFilter = (
  languageKey: LangCode,
  arrayOfStrings: MultilangString[]
) => {
  return {
    [languageKey]: arrayOfStrings
      .map((element) => {
        return element[languageKey];
      })
      .reduce((acc, x) => {
        for (let key in x) acc[key] = x[key];
        return acc;
      }, {}),
  };
};

const stringBuilderEnFr = (arrayOfStrings: MultilangString[]) => {
  const en = languageFilter('en', arrayOfStrings);
  const fr = languageFilter('fr', arrayOfStrings);
  return { ...en, ...fr };
};

export const indexPageStrings = stringBuilderEnFr([
  StringEnFr('title', 'HOLOMAKER', 'HOLOMAKER'),
  StringEnFr(
    'punchline',
    'Become a Hologram Maker',
    `Devenez créateur d'hologrammes`
  ),
  StringEnFr('The App', 'The App', "L'appli"),
  StringEnFr(
    'To create in AR, you need...',
    'To create in AR, you need...',
    'Pour créer en AR il faut...'
  ),
  StringEnFr(
    'a volumetric studio',
    'a volumetric studio',
    'un studio volumétrique'
  ),
  StringEnFr('a 3D expert', 'a 3D expert', 'un expert 3D'),
  StringEnFr(
    'a software engineer',
    'a software engineer',
    'un ingénieur informatique'
  ),
  StringEnFr('10 millions', '10 millions', '10 millions'),
  StringEnFr(
    'Shoot. Project. Share. Make your first holograms in minutes. Fast and easy.',
    'Shoot. Project. Share. Make your first holograms in minutes. Fast and easy.',
    'Filmer. Projeter. Partager. Créez votre premier hologramme en quelques minutes. Simple, rapide.'
  ),
  StringEnFr('Try it out!', 'Try it out!', 'Essayez !'),
  StringEnFr('yourPhone', 'a phone.', 'un smartphone.'),

  StringEnFr('Join the beta', 'Join the bêta', 'Rejoindre la bêta'),
  StringEnFr('joinStudio', 'Keep me in touch', 'Tenez moi au courant'),

  StringEnFr(
    'Augmented Reality Humans',
    'Augmented Reality Humans',
    'Des humains en Réalité Augmentée'
  ),
  StringEnFr(
    'ArHumanText',
    <>
      Capture people directly like you would for a video. <br />
      Create strong, meaningful AR content using the best 3D environment ever
      created: <strong>the real world</strong>. <br /> The possibilities are
      endless!
    </>,
    <>
      Filmez des personnes, comme pour une video. <br />
      Créez du contenu AR plein de sens en utilisant le meilleur environnement
      3D jamais créé: <strong>le monde réel.</strong>
      <br /> Les possibilitées sont infinies !
    </>
  ),

  StringEnFr('narrative', 'narrative', 'narration'),
  StringEnFr('fiction', 'fiction', 'fiction'),
  StringEnFr('museum guides', 'museum guides', 'guides de musées'),
  StringEnFr('music clips', 'music clips', 'clips de musique'),
  StringEnFr('short films', 'short films', 'court métrages'),
  StringEnFr('dance', 'dance', 'danse'),
  StringEnFr('theater', 'theater', 'théâtre'),
  StringEnFr("travelers' guides", "travelers' guides", 'guides de voyage'),
  StringEnFr('skate videos', 'skate videos', 'videos de skate'),
  StringEnFr('yourIdea', '<insert your idea here>', '<insérez votre idée ici>'),
  StringEnFr('comingSoon', 'Coming soon', 'Bientôt disponible'),
  StringEnFr(
    'HolomakerStudioSubtitle',
    'The first production software dedicated to AR Hologram Making.',
    "Le premier logiciel dédié à la production d'hologrammes en AR."
  ),

  StringEnFr('Shoot', 'Shoot', 'Filmez'),
  StringEnFr(
    'shootSub',
    ' enriched captures of the world with your phone.',
    ' des captures enrichies du monde réel depuis votre téléphone.'
  ),
  StringEnFr('Edit', 'Edit', 'Editez'),
  StringEnFr(
    'editSub',
    ' your holograms and the real world behind it to create amazing content',
    ' vos hologrammes et le monde réel derrière lui pour créer de supers contenus'
  ),

  StringEnFr(
    'Create interactions',
    'Create interactions',
    'Créez des interactions'
  ),
  StringEnFr(
    'interSub',
    'between your holograms, the real world and people around them!',
    'entre les hologrammes, le monde réel, et le public qui les entoure !'
  ),
  StringEnFr('Share', 'Share', 'Partagez'),
  StringEnFr('comingSoon', 'Coming soon', 'Bientôt disponible'),
  StringEnFr(
    'shareSub',
    'inside the public Holomaker app',
    "dans l'application publique Holomaker"
  ),

  StringEnFr(
    'Join the waitlist',
    'Join the waitlist',
    "Rejoindre la liste d'attente"
  ),

  StringEnFr('About Us', 'About Us', 'A propos de nous'),
  StringEnFr(
    'aboutSub',
    <>
      We're a team of cinematographers, engineers, and artists.
      <br />
      We believe AR holograms have the potential to be an incredible new media.
      <br />
      We're building the tools so <strong>you</strong> can prove it.
    </>,

    <>
      Nous sommes une équipe de cinéastes, ingénieurs et artistes.
      <br /> Nous pensons que la Réalité Augmentée peut devenir un nouveau média
      fabuleux.
      <br />
      Nous construisons les outils pour que <strong>vous</strong> puissiez le
      prouver.
    </>
  ),
]);

export const notFoundPageStrings = stringBuilderEnFr([
  StringEnFr('seoTitle', 'Subscription Confirmed', 'Inscription confirmée'),
  StringEnFr(
    'divTitle',
    'Subscription confirmed!',
    `Inscription confirmée !`
  ),
  StringEnFr(
    'divSubtitle',
    'You will receive a confirmation mail shortly.',
    `Vous allez recevoir un mail de confirmation sous peu.`
  ),
  StringEnFr(
    'goBackHome',
    'Go back Home',
    `Retour Accueil`
  ),
  
]
  );
