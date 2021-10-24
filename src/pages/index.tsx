import React from 'react';
import { CSSObject } from '@emotion/react';
import { Link, graphql } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import MainLayout from '../layout/MainLayout';
import SEO from '../bits/SEO/SEO';
import { indexPageStrings } from '../locales/strings';
import { PhotoGrid } from '../bits/PhotoGrid/PhotoGrid';
import BackgroundSlider from 'gatsby-image-background-slider';
import { SvgSlideshow } from '../components/svgSlideshow';
import PostGridFlat from '../bits/PostGridFlat/PostGridFlat';
import TldpLogo from '../bits/TldpLogo/TldpLogo';
import './index.scss';
import './PhoneMockup.scss';
import './basics.scss';
// import './SpecialAnnouncement.scss';
// import './DrawingCount.scss';
import './ShowcasePage.scss';
import Marquee from 'react-fast-marquee';
// import { UpDown } from './animations';
// import Svg from './svg';
import MonolithVisualisation from './../components/MonolithVisualisation/MonolithVisualisation';
import Slider from 'react-slick';

import MailForm from './../components/mailchimpForm/mailchimpFormPrivacyFriendly';
import { breakpointKey } from './../components/styles';
const numberOfEventsToShow = 6;
const icon = {
  hidden: {
    opacity: 1,
    pathLength: 0,
    fill: 'rgba(0,0,0,0',
    stroke: 'rgba(0,0,0,0)',
    strokeWidth: 2,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: 'rgba(0,0,0,0',
    stroke: 'white',
    strokeWidth: 2,
  },
};

/*
        <div className={'ResponsiveContainer SpecialAnnouncementBackground'}>
          <div className={'Inside'}>
            <div className="ShowcasePart Column">
              <div className={'Text Centered SpecialAnnouncement'}>
                <h2
                  className={'SpecialAnnouncementTitle'}
                  style={{ color: 'white' }}
                >
                  {LOCAL.announcementTitle}
                </h2>
                <p
                  className={'SpecialAnnouncementSubtitle'}
                  style={{ color: 'white' }}
                >
                  {LOCAL.announcemenSubtitle}
                </p>
                <Link to={onlineModeLink[langCode].path}>
                  {onlineModeLink[langCode].name}
                </Link>
              </div>
            </div>
          </div>
        </div>

        */

const responsiveContainerCSS: CSSObject = {
  display: 'flex',
  justifyContent: 'center',
};

const responsiveContainerInsideCSS: CSSObject = {
  [breakpointKey('normal')]: {
    minWidth: '60rem',
    maxWidth: '80rem',
  },
  [breakpointKey('small')]: {
    minWidth: '90vw',
    padding: '0.2rem',
  },
};

const minHeightCSS: CSSObject = {
  // height: '90vh',
  // minHeight: '90vh',
  padding: '4rem',
};

const fullSizeCSS: CSSObject = {
  height: '100vh',
  minHeight: '100vh',
};

const punchlineCSS: CSSObject = {
  fontSize: '5rem',
  [breakpointKey('small')]: {
    fontSize: '3rem',
  },
  fontWeight: 900,
  textAlign: 'center',
  color: 'rgb(230,230,230)',
  // backgroundImage: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
  // backgroundImage: 'linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%)',
  // backgroundImage: 'linear-gradient(to top, #dfe9f3 0%, white 100%)',
  // backgroundImage: 'linear-gradient(-225deg, #A445B2 0%, #D41872 52%, #FF0066 100%)',
  backgroundImage:
    'linear-gradient(-225deg, #9EFBD3 0%, #57E9F2 48%, #45D4FB 100%)',
  // backgroundImage: 'linear-gradient(-225deg, #22E1FF 0%, #1D8FE1 48%, #625EB1 100%)',
  // backgroundImage: 'linear-gradient(-225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%)',
  // backgroundImage: 'radial-gradient(73% 147%, #EADFDF 59%, #ECE2DF 100%), radial-gradient(91% 146%, rgba(255,255,255,0.50) 47%, rgba(0,0,0,0.50) 100%)',
  // backgroundBlendMode: screen;
  backgroundClip: 'text',
  textFillColor: 'transparent',
};

const welcomeCoverPhotoCSS: CSSObject = {
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};
const welcomeCoverCSS: CSSObject = {
  height: '90vh',
  minHeight: '90vh',
  lineHeight: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
const welcomeCoverPunchlineCSS: CSSObject = {
  fontSize: '4rem',
  fontWeight: 300,
  lineHeight: 1.3,
  color: 'rgb(240,240,240)',

  [breakpointKey('small')]: {
    fontSize: '3rem',
  },
};
const welcomeCoverDescriptionCSS: CSSObject = {
  lineHeight: '1.3',
  fontSize: '2.3em',
  maxWidth: '30em',
  margin: '0 auto',
  // marginTop: 'auto',
  marginBottom: '1em',
  padding: '0.5em',
  // background-color: $accentColor',
  color: 'rgb(220,220,220)',

  [breakpointKey('small')]: {
    fontSize: '1.3em',
    marginTop: 'auto',
    marginBottom: '3em',
    paddingLeft: '1em',
    paddingRight: '1em',
  },
};
const welcomeCoverInsideCSS: CSSObject = {
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  color: 'white',
  textAlign: 'center',
  // textShadow: '2px 2px 2px rgba(0, 0, 0, 0.7)',
  // background: 'rgba(0, 0, 0, 0.2)',

  [breakpointKey('normal')]: {
    //justify-content: center',
    justifyContent: 'flex-start',
  },
  [breakpointKey('small')]: {
    justifyContent: 'flex-start',
  },
};

/*
  .CoverLogo {
    width: '20rem',
    height: '20rem',
    margin: 'auto',
    marginBottom: 0,
    opacity: 0.9,

    @include breakpoint(small) {
      width: 12rem,
      height: 12rem,
    }
  }
  */

const smallyTextCSS: CSSObject = {
  fontSize: '0.9em',
  opacity: 0.7,
};

const cardCSS: CSSObject = {
  width: '15rem',
  height: '15rem',
  margin: '2rem',
  transition: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'scale(1.05)',
    transition: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
  },
  background:
    'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1em',
};

const studioCardCSS: CSSObject = {
  fontSize: '0.9em',
  width: '15em',
  height: '15em',
  margin: '2em',

  transition: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'scale(1.05)',
    transition: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
  },
  // background: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898',
  border: 'solid 4px white',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '1000px',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1em',
};
const superGradientCSS: CSSObject = {
  // backgroundImage: 'linear-gradient(to right, #434343 0%, black 100%)'
  background:
    'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898',
  backgroundBlendMode: 'multiply,multiply',
  // backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
};

const contactButtonCSS: CSSObject = {
  textDecoration: 'none',
  alignSelf: 'center',
  justifySelf: 'center',
  borderRadius: '10em',
  padding: '1em 2em 1em 2em',
  border: '2px solid white',
  transition: 'all 100ms cubic-bezier(0.4, 0, 0.2, 1)',
  textTransform: 'uppercase',
  color: 'white',
  '&:hover': {
    background: 'white',
    color: 'black',
    cursor: 'pointer',
  },
  padding: '0.4em',
  margin: '0.5em',
};

const buttonCSS: CSSObject = {
  backgroundImage:
    'linear-gradient(-225deg, #9EFBD3 0%, #57E9F2 48%, #45D4FB 100%)',
  borderRadius: '100rem',
  border: 'none',
  fontWeight: 900,
  // backgroundColor: 'black',
  color: 'black',
  padding: '1em 2em 1em 2em',
  margin: '1em',
  transition: 'all 150ms linear',
  filter: 'saturate(1)',

  '&:hover': {
    transform: 'scale(1.1)',
    cursor: 'pointer',
    transition: 'all 150ms linear',
    filter: 'saturate(1.3)',
  },
};

const marqueBlockCSS: CSSObject = {
  fontSize: '1.5em',
  fontSize: 'italic',
  padding: '0.5em',
  color: 'white',
              fontWeight: 600,
              paddingTop: '2em',
              paddingBottom: '2em',
};
///

export default function Index({ data, pageContext: { langCode }, location }) {
  const LOCAL = indexPageStrings[langCode];
  const posts = data.allMdx.edges;
  const localesOptions = { year: 'numeric', month: 'long', day: 'numeric' };

  const stayHomeLink = {
    en: { path: '/stayhome', name: LOCAL.announcementLinkName },
    fr: { path: '/fr/stayhome', name: LOCAL.announcementLinkName },
  };

  const onlineModeLink = {
    en: { path: '/online-mode', name: LOCAL.announcementLinkName },
    fr: { path: '/fr/online-mode', name: LOCAL.announcementLinkName },
  };

  /*
   <div
            className={'ResponsiveContainer WelcomerCoverPhoto'}
            style={{
              background: `url(${data.imageChevagny.childImageSharp.fluid.src})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          >
          */
  return (
    <MainLayout language={langCode} location={{ ...location }}>
      <SEO title={'Home'} langCode={langCode} />
      {/* <div css={{...welcomeCoverCSS, ...superGradientCSS, ...fullSizeCSS}}>
          <div css={welcomeCoverInsideCSS}>
          <h2 css={welcomeCoverPunchlineCSS}>{LOCAL['title']}</h2>
          <p css={welcomeCoverDescriptionCSS}>{LOCAL['punchline']}</p>
          <a css={contactButtonCSS} href={'mailto:holomaker@pm.me'}>Contact</a>
        
        </div>
        </div> */}

      <div
        css={{
          ...responsiveContainerCSS,
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '90vh',

          backgroundColor: 'rgb(10,10,10)',
        }}
      >
        <div css={{ ...responsiveContainerInsideCSS }}>
          {/* <Svg icon="box" hiddenMobile width={30} color="icon_green" left="20%" top="90%" />
        <Svg icon="hexa" width={50} stroke color="icon_brightest" left="90%" top="30%" /> */}
          {/* <Svg icon="hexa" width={80} color="icon_yellow" left="70%" top="90%" /> */}
          {/* <Svg icon="triangle" hiddenMobile width={50} stroke color="icon_teal" left="18%" top="75%" />
        <Svg icon="box" width={30} color="icon_brightest" left="75%" top="10%" />
        <Svg icon="hexa" hiddenMobile width={12} color="icon_green" left="45%" top="10%" /> */}

          {/* <MonolithVisualisation playerColor={'white'} top={'10%'} left={'90%'} scale={0.9}/>
        <MonolithVisualisation playerColor={'white'} top={'40%'} left={'30%'} scale={0.9}/>
        <MonolithVisualisation playerColor={'white'} top={'90%'} left={'20%'} scale={0.7}/>
        <MonolithVisualisation playerColor={'white'} top={'90%'} left={'70%'} scale={1}/>
        <MonolithVisualisation playerColor={'white'} top={'70%'} left={'90%'} scale={0.3}/>
        <MonolithVisualisation playerColor={'white'} top={'75%'} left={'18%'} scale={1}/>
        <MonolithVisualisation playerColor={'white'} top={'30%'} left={'90%'} scale={0.5}/> */}
          {/* <MonolithVisualisation
            playerColor={'white'}
            top={'30%'}
            left={'50%'}
            scale={3}
          /> */}
          <MonolithVisualisation
            playerColor={'white'}
            top={'80%'}
            left={'50%'}
            scale={3}
            invertMovement={true}
          />

          <h1 css={punchlineCSS}>{LOCAL['punchline']}</h1>
          {/* <StaticImage src={'./frustrum.png'}/> */}
        </div>
      </div>

      <div
        css={{
          ...responsiveContainerCSS,
          ...minHeightCSS,
          backgroundColor: 'rgb(10,10,10)',
          color: 'white',

          // backgroundImage: 'linear-gradient(15deg, #13547a 0%, #80d0c7 100%)',
        }}
      >
        <div
          css={{
            ...responsiveContainerInsideCSS,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            [breakpointKey('small')]: {
              flexDirection: 'column-reverse  ',
              justifyContent: 'center',
              alignItems: 'center',
            },
          }}
        >
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'space-around',
              justifyContent: 'center',
              paddingRight: '5em',
              maxWidth: '20rem',
              [breakpointKey('small')]: {
                alignItems: 'center',
                textAlign: 'center',
                paddingRight: 0,
                //  width: '90vw'
              },
            }}
          >
            <h2
              css={{
                fontSize: '3rem',
                [breakpointKey('small')]: { fontSize: '2rem' },
              }}
            >
              {LOCAL['The App']}
            </h2>
            <p>
              <strong css={{ fontSize: '1.5em' }}>
                {LOCAL['To create in AR, you need...']}
              </strong>
              <br />
              <del css={smallyTextCSS}>{LOCAL['a volumetric studio']}</del>
              <br /> <del css={smallyTextCSS}>{LOCAL['a 3D expert']}</del>
              <br />{' '}
              <del css={smallyTextCSS}>{LOCAL['a software engineer']}</del>
              <br />
              <del css={smallyTextCSS}>{LOCAL['10 millions']}</del>
              <br />{' '}
              <strong css={{ fontSize: '1.5em' }}>{LOCAL['yourPhone']}</strong>
              <br />
              <br />
              {
                LOCAL[
                  'Shoot. Project. Share. Make your first holograms in minutes. Fast and easy.'
                ]
              }
              <br />
              {LOCAL['Try it out!']}
            </p>

            <MailForm callName={LOCAL['Join the beta']} uniqueId={'betajoin'} />
          </div>
          <div>
            <StaticImage src={'./iphone_lambda.png'} height={500} />
          </div>
        </div>
      </div>

      <div
        css={{
          ...responsiveContainerCSS,
          backgroundColor: 'rgb(10,10,10)',
          minHeight: '70vh',
          marginTop: '5rem',
          // marginBottom: '5rem'
        }}
      >
        <div css={{ ...responsiveContainerInsideCSS, textAlign: 'center' }}>
          <h2
            css={{
              color: 'white',
              fontSize: '4rem',
              backgroundImage:
                'linear-gradient(-45deg, #FFC796 0%, #FF6B95 100%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              [breakpointKey('small')]: { fontSize: '3rem' },
            }}
          >
            {LOCAL['Augmented Reality Humans']}
          </h2>
          <p css={{ color: 'white' }}>{LOCAL['ArHumanText']}</p>
          <Marquee
            gradient={false}
            style={{
              backgroundColor: 'rgb(10,10,10)',
              // Only solution found to keep responsiveness
              width: '90vw',
              margin: 'auto',
              overflow: 'hidden',
              fontSize: '2rem',
              textTransform: 'uppercase'
            }}
            speed={40}
          >
            <div css={marqueBlockCSS}>{LOCAL['narrative']}</div>
            <div css={marqueBlockCSS}>{LOCAL['fiction']}</div>
            <div css={marqueBlockCSS}>{LOCAL['education']}</div>
            <div css={marqueBlockCSS}>{LOCAL['museum guides']}</div>
            <div css={marqueBlockCSS}>{LOCAL['music clips']}</div>
            <div css={marqueBlockCSS}>{LOCAL['short films']}</div>
            <div css={marqueBlockCSS}>{LOCAL['dance']}</div>
            <div css={marqueBlockCSS}>{LOCAL['theater']}</div>
            <div css={marqueBlockCSS}>{LOCAL[`travelers' guides`]}</div>
            <div css={marqueBlockCSS}>{LOCAL['skate videos']}</div>
            <div css={marqueBlockCSS}>{LOCAL['yourIdea']}</div>
          </Marquee>
        </div>
      </div>

      <div
        css={{
          ...responsiveContainerCSS,
          minHeight: '80vh',
          color: 'white',
          backgroundColor: 'rgb(10,10,10)',
          textAlign: 'center',
          marginBottom: '4rem',
        }}
      >
        <div css={responsiveContainerInsideCSS}>
          <h2
            css={{
              background: '#C9CCD3',

              backgroundImage:
                'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
              // backgroundImage: 'linear-gradient(to left, #BDBBBE 0%, #9D9EA3 100%), radial-gradient(88% 271%, rgba(255, 255, 255, 0.25) 0%, rgba(254, 254, 254, 0.25) 1%, rgba(0, 0, 0, 0.25) 100%), radial-gradient(50% 100%, rgba(255, 255, 255, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%)',
              backgroundBlendMode: 'normal, lighten, soft-light',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              fontSize: '4rem',
              [breakpointKey('small')]: { fontSize: '3rem' },
            }}
          >
            Holomaker Studio
          </h2>
          <p>{LOCAL['HolomakerStudioSubtitle']}</p>
          <br />
          <h3>
            <em>{LOCAL['comingSoon']}</em>
          </h3>
          <div
            css={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <div css={studioCardCSS}>
              <h3>{LOCAL['Shoot']}</h3>
              <p>{LOCAL['shootSub']}</p>
            </div>
            <div css={studioCardCSS}>
              <h3>{LOCAL['Edit']}</h3>

              <p>{LOCAL['editSub']}</p>
            </div>
            <div css={studioCardCSS}>
              <h3>{LOCAL['Create interactions']}</h3> <p>{LOCAL['interSub']}</p>
            </div>
            <div css={studioCardCSS}>
              <h3>{LOCAL['Share']}</h3> <p>{LOCAL['shareSub']}</p>
            </div>
            {/* <p>
                 <strong>Works with your workflow</strong> : We integrate with Unity, 8th wall, Unreal Engine
                </p> */}
          </div>
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MailForm callName={LOCAL['joinStudio']} uniqueId={'betajoin'} />
            {/* <form
              action="https://formspree.io/f/xnqlwogn"
  method="POST"
              css={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            > */}
            {/* <div class="form__group field">
                <input
                  type="email"
                  class="form__field"
                  placeholder="Email"
                  name="email"
                  id="email"
                  required
                />
                <label for="email" class="form__label">
                  Email
                </label>
              </div> */}

            {/* 
              <button type="submit" css={buttonCSS}>
                {LOCAL['Join the waitlist']}
              </button> */}

            {/* <mailForm/> */}

            {/* </form> */}
          </div>
        </div>
      </div>

      {/* <div css={{...responsiveContainerCSS, 
          backgroundColor: 'rgb(30,30,30)',
          color: 'white',
          textAlign: 'center',
          padding: '4em',
          paddingTop: '4em',
          paddingBottom: '4em',
          }}>
          <div css={{...responsiveContainerInsideCSS, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <h2 css={{fontSize: '3rem'}}>
                  Made with Holomaker
                </h2>
<div css={{
  display: 'flex',
  flexDirection: 'row',
  justifyItems: 'center',
  alignContent: 'center',
  flexWrap: 'wrap',
}}>
<div css={cardCSS}>Coming Soon...</div>
<div css={cardCSS}>Coming Soon...</div>
<div css={cardCSS}>Coming Soon...</div>
</div>
          </div>
          </div> */}

      {/* <div
        css={{
          ...responsiveContainerCSS,
          backgroundColor: 'rgb(30,30,30)',
          color: 'white',
          textAlign: 'center',
          padding: '4em',
          paddingTop: '4em',
          paddingBottom: '4em',
        }}
      >
        <div
          css={{
            ...responsiveContainerInsideCSS,
            paddingTop: '5rem',
            paddingBottom: '5rem',
          }}
        >
          <h2 css={{ fontSize: '3rem' }}>{LOCAL['About Us']}</h2>
          <p css={{ fontSize: '1.5em' }}>
            {LOCAL['aboutSub']}
            <br />
            <br />
          </p>
        </div>
      </div> */}

      {/* <div css={{...responsiveContainerCSS, 
          backgroundColor: 'rgb(30,30,30)',
          color: 'white',
          textAlign: 'center',
          padding: '4em',
          paddingTop: '4em',
          paddingBottom: '4em',
          
          }}>
          <div css={{...responsiveContainerInsideCSS, justifyContent: 'center',
          alignItems: 'center'}}>

<h2 css={{fontSize: '3rem'}}>
                  Contact
                </h2>
                <form method="post" action="#"  css={{display: 'flex', flexDirection: 'column', justifyContent: 'center',
          alignItems: 'center'}}>

  <div class="form__group field">
  <input type="name" class="form__field" placeholder="Name" name="name" id='name' required />
  <label for="name" class="form__label">Name</label>
</div>

    <div class="form__group field">
  <input type="email" class="form__field" placeholder="Email" name="email" id='email' required />
  <label for="email" class="form__label">Email</label>
</div>


    <div class="form__group field">
  <input type="subject" class="form__field" placeholder="Subject" name="subject" id='subject' required />
  <label for="subject" class="form__label">Subject</label>
</div>

    <div class="form__group field">
  <input type="message" class="form__field" placeholder="Message" name="message" id='message' required rows="5" />
  <label for="message" class="form__label">Message</label>
</div>


  <button type="submit" css={buttonCSS}>Send</button>
</form>


          </div>
          </div> */}

      {/* <div css={{...responsiveContainerCSS, ...minHeightCSS}}>
          <div css={responsiveContainerInsideCSS}>
          <div className={'Text Centered'}>
                <h2>
                  You have an idea for an AR hologram?
                </h2>
                <p>
                Tell us and we'll bring it to life
                </p>
                <button>Call to action</button>
              </div>
          </div>
          </div> */}
    </MainLayout>
  );
}

export const indexPageQuery = graphql`
  query IndexQuery {
    backgrounds: allFile(filter: { absolutePath: { regex: "/backgrounds/" } }) {
      nodes {
        relativePath
        childImageSharp {
          fluid(maxWidth: 1400, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    allMdx(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { category: { eq: "event" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            category
            subtitle
            language
            image {
              childImageSharp {
                gatsbyImageData(height: 500, placeholder: BLURRED)
              }
            }
          }
        }
      }
    }
  }
`;
