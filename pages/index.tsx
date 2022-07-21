import Head from 'next/head';
import { motion } from 'framer-motion';
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { SocialLinks } from '../components/social_links';
import { ContactForm } from '../components/contact_form';
import { ProfileImage } from '../components/profile_image';

type HomePageProps = {
  imageId: number;
};

const Home = ({ imageId }: HomePageProps) => {
  return (
    <div>
      <Head>
        <title>Jan Halama</title>
        <meta name="description" content="Jan Halama’s profile" />
        <link rel="icon" href="/favicon.png" type="image/png" />
      </Head>
      {/* Hero_Section */}
      <section id="hero_section" className="top_cont_outer">
        <div className="hero_wrapper">
          <div className="container">
            <div className="hero_section">
              <div className="row">
                <div className="col-md-6">
                  <motion.div
                    className="top_left_cont intro"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <h2>
                      I’m Jan Halama <br /> <strong>Software Engineer</strong>
                    </h2>
                    <p>
                      with lifelong passion for technologies and software
                      development.
                    </p>
                    <div className="underline"></div>
                    <SocialLinks />
                  </motion.div>
                </div>
                <div className="col-md-6">
                  <ProfileImage imageId={imageId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Hero_Section */}

      {/* Header_section */}
      <header id="header_wrapper">
        <div className="header_box">
          <Navbar className="navbar navbar-inverse" role="navigation">
            <div className="navbar-header">
              <Navbar.Toggle
                type="button"
                id="nav-toggle"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target="#main-nav"
              >
                <span className="sr-only">Toggle navigation</span>{' '}
                <span className="icon-bar"></span>{' '}
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>{' '}
              </Navbar.Toggle>
            </div>
            <div id="main-nav" className="collapse navbar-collapse navStyle">
              <ul className="nav navbar-nav" id="mainNav">
                <li className="active">
                  <a href="#hero_section" className="scroll-link">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#contact" className="scroll-link">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </Navbar>
        </div>
      </header>
      {/* Header_section */}

      {/* Footer */}
      <footer className="footer_wrapper" id="contact">
        <div className="container">
          <section className="page_section contact" id="contact">
            <div className="contact_section">
              <h2>Get In Touch</h2>
              <h6>
                Am I a good match for your project or team? Don’t hesitate to
                contact me!
              </h6>
            </div>
            <div className="row">
              <div className="col-lg-4 wow fadeInLeft">
                <div className="contact_info">
                  <div className="detail">
                    <h4>Jan Halama</h4>
                    <p>Krásná 76, Pěnčín 468 21, Czechia</p>
                  </div>
                  <div className="detail">
                    <h4>Call me</h4>
                    <p>+420 774 770 433</p>
                  </div>
                  <div className="detail">
                    <h4>Email me</h4>
                    <p>mail@janhalama.cz</p>
                  </div>
                </div>

                <SocialLinks />
              </div>
              <div className="col-lg-8 wow fadeInLeft delay-06s">
                <ContactForm />
              </div>
            </div>
          </section>
        </div>
        <div className="container">
          <div className="footer_bottom">
            <span>v3.0.0</span>
            <span>
              Copyright © 2018.{' '}
              <a
                href="https://webthemez.com/free-bootstrap-templates/"
                target="_blank"
                rel="noreferrer"
              >
                Bootstrap Templates
              </a>{' '}
              By WebThemez
            </span>{' '}
          </div>
        </div>
      </footer>
      {/* Footer */}
    </div>
  );
};

export const getServerSideProps = () => {
  const imagesCount = 2;
  const imageId = (Math.round(Math.random() * 10) % imagesCount) + 1;

  return {
    props: {
      imageId,
    },
  };
};

export default Home;
