import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'


const Footer = () => {
            return (
                        <div className='footer' id='footer'>
                                    <div className="footer-content">
                                                <div className="footer-content-left">
                                                            <img src={assets.logo} alt="logo" />
                                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti quam delectus impedit perferendis nemo, aspernatur voluptatibus hic molestiae dignissimos rem consectetur soluta minima aut architecto sed, doloremque saepe adipisci sunt.</p>
                                                            <div className="footer-social-icons">
                                                                        <img src={assets.facebook_icon} alt="" />
                                                                        <img src={assets.twitter_icon} alt="" />
                                                                        <img src={assets.linkedin_icon} alt="" />
                                                            </div>
                                                </div>
                                                <div className="footer-content-center">
                                                            <h2>Company</h2>
                                                            <ul><li>Home</li>
                                                            <li>About</li>
                                                            <li>Delivery</li>
                                                            <li>Privacy Policy</li></ul>
                                                </div>
                                                <div className="footer-content-right">
                                                            <h2>Get In Touch</h2>
                                                            <ul>
                                                                        <li>+91 7428709978</li>
                                                                        <li>thelofisongs909@gmail.com</li>
                                                            </ul>
                                                </div>
                                    </div>
                                    <hr />
                                    <p className='footer-copyright'>
                                                  © 2025 Tomato. All rights reserved.
                                    </p>
                        </div>
            )
}

export default Footer

