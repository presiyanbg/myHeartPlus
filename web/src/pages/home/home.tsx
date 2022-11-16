import React, { useState } from 'react';
import Hero from '../../assets/images/hero__7.jpg';
import Logo from '../../assets/images/logo--white.png';
import { changeOpacityOnScroll } from '../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faFileCircleCheck, faUserDoctor, faStaffSnake } from '@fortawesome/free-solid-svg-icons'

type Props = {};

const Home = ({ }: Props) => {
  let heroRef = React.createRef<HTMLDivElement>();

  changeOpacityOnScroll(heroRef, false, 'opacity');

  return (
    <>
      <div className='hero' >
        <div className="hero--head">
          <div className="hero--head-logo" ref={heroRef}>
            <img src={Logo} alt="" />
          </div>
        </div>
      </div>

      <div className="wrapper">
        <div className="page">
          <div className="box-wrapper">
            <div className="box">
              <div className="box--head">
                <div className="box--icon">
                  <FontAwesomeIcon icon={faHeart} size="6x" />
                </div>
              </div>
              <div className="box--body">
                <div className="box--title">
                  <h3>Health</h3>
                </div>
                <div className="box--content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas consequuntur sint quam et, tempora impedit itaque quia provident assumenda distinctio vitae iusto quidem harum? Nostrum dolores facilis debitis ab enim!
                </div>
              </div>
            </div>

            <div className="box">
              <div className="box--head">
                <div className="box--icon">
                  <FontAwesomeIcon icon={faFileCircleCheck} size="6x" />
                </div>
              </div>
              <div className="box--body">
                <div className="box--title">
                  <h3>Check</h3>
                </div>
                <div className="box--content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas consequuntur sint quam et, tempora impedit itaque quia provident assumenda distinctio vitae iusto quidem harum? Nostrum dolores facilis debitis ab enim!
                </div>
              </div>
            </div>

            <div className="box">
              <div className="box--head">
                <div className="box--icon">
                  <FontAwesomeIcon icon={faUserDoctor} size="6x" />
                </div>
              </div>
              <div className="box--body">
                <div className="box--title">
                  <h3>Contact a doctor</h3>
                </div>
                <div className="box--content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas consequuntur sint quam et, tempora impedit itaque quia provident assumenda distinctio vitae iusto quidem harum? Nostrum dolores facilis debitis ab enim!
                </div>
              </div>
            </div>
          </div>

          {/* <div className="box box-xl">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem libero repellendus sit ipsa deleniti, deserunt sapiente facilis omnis, aut beatae suscipit, alias eum veniam in repudiandae odit asperiores molestias fuga?
          </div> */}
        </div>
      </div>

      <div className='hero--background'>
        <div className="hero--background-image img-shadow img-shadow--left">
          <img src={Hero} alt="Medicine wallpaper" />
        </div>
      </div>
    </>
  )
}

export default Home;