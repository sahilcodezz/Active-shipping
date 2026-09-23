import { useEffect, useState } from 'react'

const App = () => {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 20)
      const header = document.getElementById('site-header')
      if (header) {
        header.classList.toggle('nav-fixed', window.scrollY >= 80)
      }
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    let cancelled = false
    let tries = 0
    let timeoutId

    const header = document.getElementById('site-header')
    const onTogglerClick = () => {
      header?.classList.toggle('active')
      document.body.classList.toggle('noscroll')
    }
    const toggler = document.querySelector('.navbar-toggler')
    toggler?.addEventListener('click', onTogglerClick)
    const onResize = () => {
      if (window.innerWidth > 991) header?.classList.remove('active')
    }
    window.addEventListener('resize', onResize)

    const initCarousels = () => {
      if (cancelled) return
      const $ = window.jQuery
      if (!$ || !$.fn || !$.fn.owlCarousel) {
        if (tries < 40) {
          tries += 1
          timeoutId = window.setTimeout(initCarousels, 50)
        }
        return
      }

      $('.owl-one').owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        responsiveClass: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplaySpeed: 1000,
        autoplayHoverPause: false,
        responsive: {
          0: { items: 1 },
          480: { items: 1 },
          667: { items: 1 },
          1000: { items: 1 },
        },
      })

      $('#owl-demo1').owlCarousel({
        loop: true,
        margin: 20,
        nav: false,
        responsiveClass: true,
        responsive: {
          0: { items: 1, nav: false },
          768: { items: 1, nav: false },
          1000: { items: 1, nav: false, loop: false },
        },
      })
    }

    initCarousels()

    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
      toggler?.removeEventListener('click', onTogglerClick)
      window.removeEventListener('resize', onResize)
      const $ = window.jQuery
      if ($ && $.fn && $.fn.owlCarousel) {
        try {
          $('.owl-one').owlCarousel('destroy')
          $('#owl-demo1').owlCarousel('destroy')
        } catch {
          /* ignore */
        }
      }
    }
  }, [])

  const topFunction = () => {
    window.scrollTo({ top: 0 })
  }

  return (
    <>
      <style>{`
.float{
position:fixed;
width:60px;
height:60px;
bottom:60px;
right:80px;
background-color:#25d366;
color:#FFF;
border-radius:50px;
text-align:center;
  font-size:30px;
box-shadow: 2px 2px 3px #999;
  z-index:100;
}
.my-float{
	margin-top:16px;
}
textspan {
 /* background-color: #ffffff; */
}
#hp  {
float: right;    
}
      `}</style>

      {/* top header */}
      <a href="https://api.whatsapp.com/send?phone=919833672298&text=inquiry" className="float" target="_blank" rel="noreferrer">
        <i className="fab fa-whatsapp my-float"></i>
      </a>
      <section className="w3l-top-header py-3">
        <div className="container">
          <img src="assets/images/10years.jpg" style={{ width: '90px', float: 'right', top: '80px', right: '80px' }} alt="ACTIVE SHIPPING AND LOGISTICS. Freight Services Mumbai India" />
          <div className="d-grid main-top">
            <div className="top-header-left">
              <ul className="info-top-gridshny">
                <li className="info-grid">
                  <div className="info-icon"><span className="far fa-envelope"></span></div>
                  <div className="info-text">
                    <p style={{ textTransform: 'lowercase' }}><a href="mailto:sales@activeshpg.com">sales@activeshpg.com</a></p>
                    <p style={{ textTransform: 'lowercase' }}><a href="mailto:contact@activeshpg.com">contact@activeshpg.com</a></p>
                  </div>

                </li>
                <li className="info-grid">
                  <div className="info-icon"><span className="fas fa-phone-alt"></span></div>
                  <div className="info-text">
                    <p><a href="tel:+91 9833672298">+91 9833672298</a></p>
                    <p><a href="tel:+91 9821253239">+91 9821253239</a></p>
                  </div>

                </li>
                <li className="info-grid">
                  <div className="info-icon"><span className="fas fa-map-marker-alt"></span></div>
                  <div className="info-text">
                    <p>Navjeevan Co-Op, Office No.18,</p>
                    <p>Malad East. Mumbai 97</p>

                  </div>

                </li>

              </ul>
            </div>
            {/*
            <div className="top-header-right text-lg-right">
                <ul>
                    <li>
                        <a href="https://www.facebook.com/people/Active-Shipping-and-Logistics/100054488078426/" target="_blank" rel="noreferrer"><span className="fab fa-facebook-f"></span></a>
                    </li>
                    <li>
                        <a href="#twitter"><span className="fab fa-twitter"></span></a>
                    </li>
                    <li><a href="#instagram" className="instagram mr-0"><span className="fab fa-instagram"></span></a></li>

                </ul>
            </div>
            */}
          </div>
        </div>
      </section>
      {/* //top header */}

      {/*/Header*/}
      <header id="site-header" className="">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light stroke py-lg-0">
            <h6><a className="navbar-brand pe-xl-5 pe-lg-4" href="index.html">
              <img src="assets/images/active-shipping-cargo-frieght-logistic-and-transportation-logo.png" alt="ACTIVE SHIPPING AND LOGISTICS. Freight Services Mumbai India" title="ACTIVE SHIPPING AND LOGISTICS. Freight Services Mumbai India" style={{ height: '35px' }} />Active Shipping And Logistics
            </a></h6>


            <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon fa icon-expand fa-bars"></span>
              <span className="navbar-toggler-icon fa icon-close fa-times"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarScroll">
              <ul className="navbar-nav ms-lg-auto my-2 my-lg-0 navbar-nav-scroll">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="index.html">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="about.html">About</a>
                </li>
                {/*
                <li className="nav-item">
                    <a className="nav-link" href="services.html">Services</a>
                </li>
                */}
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#Pages" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Services <span className="fa fa-angle-down ms-1"></span>
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ backgroundImage: "url('assets/images/Active_Shipping_and_Logistics_Service_2.jpg')", backgroundRepeat: 'no-repeat' }}>

                    <li><a className="dropdown-item" href="Active-Shipping-and-Logistics-Air-Freight.html" style={{ color: '#ffffff' }}><textspan>Air Freight</textspan></a></li>
                    <li><a className="dropdown-item" href="Active-Shipping-and-Logistics-Ocean-Freight.html" style={{ color: '#ffffff' }}><textspan>Ocean Freight<br />LCL/FCL/<br />Special Equipments</textspan></a></li>
                    <li><a className="dropdown-item" href="Active-Shipping-and-Logistics-Land-Transportation.html" style={{ color: '#ffffff' }}><textspan>Land Transportation</textspan></a></li>
                    <li><a className="dropdown-item" href="Active-Shipping-and-Logistics-Warehousing-and-Distribution.html" style={{ color: '#ffffff' }}><textspan>Warehousing <br />& Distribution</textspan></a></li>
                    <li><a className="dropdown-item" href="Active-Shipping-and-Logistics-Customs-Clearance-and-Door-delivery.html" style={{ color: '#ffffff' }}><textspan>Customs Clearance</textspan></a></li>
                    <li><a className="dropdown-item" href="https://activeshpg.com/Active-Shipping-and-Logistics-Baggage.html" style={{ color: '#ffffff' }}><textspan>Personal Baggage</textspan></a></li>
                    <li><a className="dropdown-item" href="Active-Shipping-and-Logistics-Packing-and-Removals.html" style={{ color: '#ffffff' }}><textspan>Packing & Removals</textspan></a></li>
                    <li><a className="dropdown-item" href="Active-Shipping-and-Logistics-Dangerous-Goods.html" style={{ color: '#ffffff' }}><textspan>Dangerous goods</textspan></a></li>
                    <li><a className="dropdown-item" href="Active-Shipping-and-Logistics-Services.html" style={{ color: '#ffffff' }}><textspan>Transshipment<br />(sea to air, air to air)</textspan></a></li>
                    <li><a className="dropdown-item" href="Active-Shipping-and-Logistics-Services.html"><textspan>Project management</textspan></a></li>
                    <li><a className="dropdown-item" href="Active-Shipping-and-Logistics-Services.html"><textspan>RO-RO and <br />Break bulk operation</textspan></a></li>
                    <li><a className="dropdown-item" href="Active-Shipping-and-Logistics-Services.html"><textspan>Cargo charter</textspan></a></li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#Pages" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Branches <span className="fa fa-angle-down ms-1"></span>
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ backgroundImage: "url('assets/images/Active_Shipping_and_Logistics_Service_2.jpg')", backgroundRepeat: 'no-repeat' }}>
                    <li><a className="dropdown-item" href="locations.html" style={{ color: '#ffffff' }}><textspan>Mumbai , M.H</textspan></a>
                    </li>
                    <li><a className="dropdown-item" href="locations.html" style={{ color: '#ffffff' }}><textspan>Visakhapatnam, A.P</textspan></a>
                    </li>
                    <li><a className="dropdown-item" href="locations.html" style={{ color: '#ffffff' }}><textspan>Kakinada, A.P</textspan></a>
                    </li>
                    <li><a className="dropdown-item" href="locations.html" style={{ color: '#ffffff' }}><textspan>Kolkata, W.B</textspan></a>
                    </li>
                    <li><a className="dropdown-item" href="locations.html" style={{ color: '#ffffff' }}><textspan>Chennai, T.N</textspan></a>
                    </li>
                    <li><a className="dropdown-item" href="locations.html" style={{ color: '#ffffff' }}><textspan>Mundra, G.J</textspan></a>
                    </li>
                    <li><a className="dropdown-item" href="locations.html" style={{ color: '#ffffff' }}><textspan>Hyderabad , T.L</textspan></a>
                    </li>
                    <li><a className="dropdown-item" href="locations.html" style={{ color: '#ffffff' }}><textspan>Delhi</textspan></a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="contact.html">Contact</a>
                </li>
              </ul>

              {/*/search-right*/}
              <ul className="header-search mx-lg-4">
                <div className="w3hny-search">
                  <form action="processsearch.php" method="post" className="d-flex search-form">
                    <input className="form-control" type="search" placeholder="Search..." name="inputsearch" aria-label="Search" required="" />
                    <button className="btn btn-style btn-primary" type="submit"><i className="fas fa-search"></i></button>
                  </form>
                </div>
              </ul>
              {/*//search-right*/}
            </div>
            {/* toggle switch for light and dark theme */}
            <div className="mobile-position">
              <nav className="navigation">
                <div className="theme-switch-wrapper">
                  <label className="theme-switch" htmlFor="checkbox">
                    <input type="checkbox" id="checkbox" />
                    <div className="mode-container">
                      <i className="gg-sun"></i>
                      <i className="gg-moon"></i>
                    </div>
                  </label>
                </div>
              </nav>
            </div>
            {/* //toggle switch for light and dark theme */}
          </nav>
        </div>
      </header>
      {/*//Header*/}
      {/*/Banner-Start*/}
      {/* main-slider */}
      <section className="w3l-main-slider banner-slider" id="home">
        <div className="owl-one owl-carousel owl-theme">
          <div className="item">
            <div
              className="slider-info banner-view banner-top1"
              style={{ backgroundImage: 'url(/assets/images/banner1.jpg)' }}
            >
              <div className="container">
                <div className="banner-info header-hero-19 pt-lg-5">
                  <h3 className="title-hero-19">Air freight</h3>
                  <h3 className="title-hero-19">Air Cargo Management</h3>
                  <p className="mt-4">ASL Air Freight division is a proven success in the realm of its operation.</p>

                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div
              className="slider-info banner-view banner-top2"
              style={{ backgroundImage: 'url(/assets/images/banner2.jpg)' }}
            >
              <div className="container">
                <div className="banner-info header-hero-19 pt-lg-5">
                  <h3 className="title-hero-19">Sea Freight</h3>
                  <h3 className="title-hero-19">large, heavy and bulky international shipment</h3>
                  <p className="mt-4">high quality sea freight services for companies of all sizes</p>

                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div
              className="slider-info banner-view banner-top3"
              style={{ backgroundImage: 'url(/assets/images/banner3.jpg)' }}
            >
              <div className="container">
                <div className="banner-info header-hero-19 pt-lg-5">
                  <h3 className="title-hero-19">Personal Baggage</h3>
                  <h3 className="title-hero-19">Packing and crating</h3>
                  <p className="mt-4">personal belongings and home products are safely and securely packed for transportation</p>


                </div>
              </div>
            </div>
          </div>
          {/*<div className="item">
              <div className="slider-info banner-view banner-top4">
                  <div className="container">
                      <div className="banner-info header-hero-19 pt-lg-5">
                          <h3 className="title-hero-19">Quality is </h3>
                          <h3 className="title-hero-19">Our speciality.</h3>
                          <p className="mt-4">Because we know how important this is for you</p>
                      </div>
                  </div>
              </div>
          </div>*/}

        </div>
      </section>
      {/* //main-slider */}

      {/*/w3-grids*/}
      <section className="w3l-passion-sec2 py-5">
        <div className="container py-md-5 py-3">
          <div className="container">
            <img src="assets/images/10years.jpg" style={{ width: '90px', float: 'right', top: '80px', right: '80px' }} alt="ACTIVE SHIPPING AND LOGISTICS. Freight Services Mumbai India" />
            <div className="row w3l-passion-mid-grids">
              <div className="col-lg-6 passion-grid-item-info pe-lg-5 mb-lg-0 mb-5">
                <div className="title-content-two">
                  <h6 className="title-subw3hny mb-1 text-left">About</h6>
                  <h1 className="title-w3l mb-4">Active Shipping and Logistics</h1>
                  <p className="mt-3 pe-lg-5"> A leading India based International Freight Forwarder.</p>
                </div>
                <p className="mt-3 pe-lg-5">We offer freight forwarding and logistics services worldwide. Active Shipping and Logistics is well established with experienced personnel who respond efficiently and quickly to our customers and overseas agents. We believe in delivering logistics services on time at competitive prices. We offer best international shipping rates.
                </p>
                <div className="w3banner-content-btns">
                  <a href="about.html" className="btn btn-style btn-primary mt-lg-5 mt-4 me-2">Read More </a>
                  <a href="contact.html" className="btn btn-style btn-outline-dark mt-lg-5 mt-4">Contact Us </a>
                </div>

              </div>
              <div className="col-lg-6 w3hny-passion-item">
                <a href="about.html"><img src="assets/images/Active_Shipping_and_Logistics_about.jpg" alt="ACTIVE SHIPPING AND LOGISTICS. Freight Services Mumbai India" className="img-fluid radius-image" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/*//w3-grids*/}

      {/* features section */}
      <section className="w3l-features py-5 pt-0" id="features">
        <div className="container py-lg-5 py-md-4 py-2 pt-0">
          <img src="assets/images/10years.jpg" alt="ACTIVE SHIPPING AND LOGISTICS. Freight Services Mumbai India" style={{ width: '90px', float: 'right', top: '80px', right: '80px' }} />
          <div className="main-cont-wthree-2 align-items-center text-left">
            <div className="title-content-two">
              <h6 className="title-subw3hny mb-1 text-left">Services</h6>
              <h3 className="title-w3l mb-4">Active Shipping and Logistics</h3>
              <p className="mt-3 pe-lg-5"> </p>
            </div>
            <div className="row align-items-center">
              <div className="col-lg-3 col-md-6">
                <div className="grids-1 box-wrap">
                  <div className="icon">
                    <i className="fas fa-plane"></i>
                  </div>
                  <h4><a href="#service" className="title-head mb-3">Air freight</a></h4>
                  <p className="text-para">Active Shipping and Logistics offers sophisticated and innovative Air Cargo. </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mt-lg-0 mt-5">
                <div className="grids-1 box-wrap">
                  <div className="icon">
                    <i className="fas fa-ship"></i>
                  </div>
                  <h4><a href="#service" className="title-head mb-3">Ocean freight</a></h4>
                  <p className="text-para">Sea Freight is the ultimate choice of large, heavy and bulky international shipments.</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mt-md-0 mt-5">
                <div className="grids-1 box-wrap">
                  <div className="icon">
                    <i className="fas fa-warehouse"></i>
                  </div>
                  <h4><a href="#service" className="title-head mb-3">Warehousing</a></h4>
                  <p className="text-para">We provide storage and distribution facility for various products.</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mt-md-0 mt-5">
                <div className="grids-1 box-wrap">
                  <div className="icon">
                    <i className="fas fa-box"></i>
                  </div>
                  <h4><a href="#service" className="title-head mb-3">Packing and Removals</a></h4>
                  <p className="text-para">We are expertise in arranging household, commercial, local and international movements.</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mt-md-0 mt-5">
                <div className="grids-1 box-wrap">
                  <div className="icon">
                    <i className="fas fa-truck"></i>
                  </div>
                  <h4><a href="#service" className="title-head mb-3">Transport</a></h4>
                  <p className="text-para">We have dedicated transport facilities to move cargo within India all sectors including customs clearances.</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mt-md-0 mt-5">
                <div className="grids-1 box-wrap">
                  <div className="icon">
                    <i className="fas fa-check"></i>
                  </div>
                  <h4><a href="#service" className="title-head mb-3">Custom Clearance</a></h4>
                  <p className="text-para">At Active Shipping and Logistics we understand the necessity of smooth customs clearance for our customers.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      {/*//features section */}


      {/*/w3-grids*/}
      <section className="w3l-passion-mid-sec py-5">
        <div className="container py-md-5 py-3">
          <img src="assets/images/10years.jpg" style={{ width: '90px', float: 'right', top: '80px', right: '80px' }} alt="ACTIVE SHIPPING AND LOGISTICS. Freight Services Mumbai India" />
          <div className="container">
            <div className="row w3l-passion-mid-grids">
              <div className="col-lg-6 passion-grid-item-info pe-lg-5 mb-lg-0 mb-5">
                <div className="title-content-two">
                  <h6 className="title-subw3hny mb-1 text-left">Quality</h6>
                  <h3 className="title-w3l mb-4">Your Trusted Logistic Service Partner</h3>
                </div>
                <p className="mt-3 pe-lg-5">Active Shipping and Logistics is well established with experienced personnel who respond efficiently and quickly to our customers and overseas agents.</p>
                <div className="w3banner-content-btns">
                  <a href="about.html" className="btn btn-style btn-outline-dark mt-lg-5 mt-4">Read More </a>
                </div>

              </div>
              <div className="col-lg-6 w3hny-passion-item">
                <div className="row">
                  <div className="col-6 passion-grid-item-pic">
                    <img src="assets/images/Active_Shipping_and_Logistics_Service_1.jpg" alt="ACTIVE SHIPPING AND LOGISTICS. Freight Services Mumbai India" className="img-fluid radius-image" />
                    <img src="assets/images/Active_Shipping_and_Logistics_Service_2.jpg" alt="ACTIVE SHIPPING AND LOGISTICS. Freight Services Mumbai India" className="img-fluid radius-image" />

                  </div>

                  <div className="col-6 passion-grid-item-pic">
                    <img src="assets/images/Active_Shipping_and_Logistics_Service_3.jpg" alt="ACTIVE SHIPPING AND LOGISTICS. Freight Services Mumbai India" className="img-fluid radius-image" />
                    <img src="assets/images/Active_Shipping_and_Logistics_Service_4.jpg" alt="ACTIVE SHIPPING AND LOGISTICS. Freight Services Mumbai India" className="img-fluid radius-image" />
                  </div>


                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/*//w3-grids*/}
      {/*/testimonials*/}

      <section className="w3l" id="">
        <div className="cusrtomer-layout py-5">
          <img src="assets/images/10years.jpg" alt="ACTIVE SHIPPING AND LOGISTICS. Freight Services Mumbai India" style={{ width: '90px', float: 'right', top: '80px', right: '80px' }} />
          <div className="container py-md-5">
            <div className="text-center">
              <h6 className="title-subw3hny">Our Happy Clients</h6>
              <h3 className="title-w3l two mb-5"></h3>
            </div>
            <div className="testimonial-width pt-lg-4">
              <div id="owl-demo1" className="owl-two owl-carousel owl-theme">
                <div className="item">
                  <div className="col-lg-12 w3hny-passion-item">
                    <div className="row">
                      <div className="col-6 passion-grid-item-pic">

                        <img src="assets/images/clients/bagla-group.png" alt="ACTIVE SHIPPING AND LOGISTICS. Freight Services Mumbai India" style={{ width: '250px' }} className="img-fluid radius-image" />
                        <img src="assets/images/clients/Hyundai_Mobis.png" alt="ACTIVE SHIPPING AND LOGISTICS. Freight Services Mumbai India" style={{ width: '250px' }} className="img-fluid radius-image" />
                        <img src="assets/images/clients/sigachi.png" style={{ width: '250px' }} alt="ACTIVE SHIPPING AND LOGISTICS. Freight Services Mumbai India" className="img-fluid radius-image" />
                        <img src="assets/images/clients/alkon.png" alt="ACTIVE SHIPPING AND LOGISTICS. Freight Services Mumbai India" style={{ width: '250px' }} className="img-fluid radius-image" />
                        <img src="assets/images/clients/Ganesh Benzoplast Limited 2.jpg" alt="ACTIVE SHIPPING AND LOGISTICS. Freight Services Mumbai India" style={{ width: '250px' }} className="img-fluid radius-image" />
                        <img src="assets/images/clients/amocon-logo.png" alt="ACTIVE SHIPPING AND LOGISTICS. Freight Services Mumbai India" style={{ width: '250px' }} className="img-fluid radius-image" />
                      </div>

                      <div className="col-6 passion-grid-item-pic">
                        <img src="assets/images/clients/STERLITE TECH.png" alt="ACTIVE SHIPPING AND LOGISTICS. Freight Services Mumbai India" style={{ width: '250px' }} className="img-fluid radius-image" />
                        <img src="assets/images/clients/Bajaj_Auto_Ltd.png" alt="ACTIVE SHIPPING AND LOGISTICS. Freight Services Mumbai India" style={{ width: '250px' }} className="img-fluid radius-image" />
                        <img src="assets/images/clients/nclbuildtek.com.png" style={{ width: '250px' }} alt="ACTIVE SHIPPING AND LOGISTICS. Freight Services Mumbai India" className="img-fluid radius-image" />
                        <img src="assets/images/clients/KABRA.png" alt="ACTIVE SHIPPING AND LOGISTICS. Freight Services Mumbai India" style={{ width: '250px' }} className="img-fluid radius-image" />
                        <img src="assets/images/clients/RELAXO.png" alt="ACTIVE SHIPPING AND LOGISTICS. Freight Services Mumbai India" style={{ width: '250px' }} className="img-fluid radius-image" />
                        <img src="assets/images/clients/itaca.jpg" style={{ width: '250px' }} alt="ACTIVE SHIPPING AND LOGISTICS. Freight Services Mumbai India" className="img-fluid radius-image" />
                      </div>


                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="col-lg-12 w3hny-passion-item">
                    <div className="row">
                      <div className="col-6 passion-grid-item-pic">
                        <img src="assets/images/clients/KABRA.png" alt="ACTIVE SHIPPING AND LOGISTICS. Freight Services Mumbai India" style={{ width: '250px' }} className="img-fluid radius-image" />
                        <img src="assets/images/clients/MOBIS.jpg" alt="ACTIVE SHIPPING AND LOGISTICS. Freight Services Mumbai India" style={{ width: '250px' }} className="img-fluid radius-image" />

                      </div>

                      <div className="col-6 passion-grid-item-pic">
                        <img src="assets/images/clients/RELAXO.png" alt="ACTIVE SHIPPING AND LOGISTICS. Freight Services Mumbai India" style={{ width: '250px' }} className="img-fluid radius-image" />
                        <img src="assets/images/clients/SIGACHI.jpg" style={{ width: '250px' }} alt="ACTIVE SHIPPING AND LOGISTICS. Freight Services Mumbai India" className="img-fluid radius-image" />
                      </div>


                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="col-lg-12 w3hny-passion-item">
                    <div className="row">
                      <div className="col-6 passion-grid-item-pic">
                        <img src="assets/images/clients/alkon.png" alt="ACTIVE SHIPPING AND LOGISTICS. Freight Services Mumbai India" style={{ width: '250px' }} className="img-fluid radius-image" />
                        <img src="assets/images/clients/STERLITE TECH.png" alt="ACTIVE SHIPPING AND LOGISTICS. Freight Services Mumbai India" style={{ width: '250px' }} className="img-fluid radius-image" />

                      </div>

                      <div className="col-6 passion-grid-item-pic">
                        <img src="assets/images/clients/Ganesh Benzoplast Limited 2.jpg" alt="ACTIVE SHIPPING AND LOGISTICS. Freight Services Mumbai India" style={{ width: '250px' }} className="img-fluid radius-image" />
                        <img src="assets/images/clients/ITACA.jpg" style={{ width: '250px' }} alt="ACTIVE SHIPPING AND LOGISTICS. Freight Services Mumbai India" className="img-fluid radius-image" />
                      </div>


                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*//testimonials*/}

      {/*/w3l-subscribe*/}

      {/*//w3l-subscribe*/}
      {/*/footer-9*/}
      <footer className="w3l-footer9">
        <section className="footer-inner-main py-5">
          <div className="container py-md-3">
            <div className="right-side">
              <div className="row footer-hny-grids sub-columns">
                <div className="col-lg-4 sub-one-left pe-lg-5">
                  <h6>About </h6>
                  <h6>ACTIVE SHIPPING AND LOGISTICS</h6>
                  <p className="footer-phny pe-lg-3">Indian International freight forwarding company in Mumbai, Air Freight, Sea Freight, Road Transport, Warehousing Distribution, Customs Clearance, Dangerous goods, Packing and Removals,Transshipment (sea to air, air to air), Project management, RO-RO and Break bulk</p>
                  <div className="columns-2 mt-lg-5 mt-4">
                    <ul className="social">
                      <li><a href="https://www.facebook.com/people/Active-Shipping-and-Logistics/100054488078426/" target="_blank" rel="noreferrer"><span className="fab fa-facebook-f"></span></a>
                      </li>
                      <li><a href="#linkedin"><span className="fab fa-linkedin-in"></span></a>
                      </li>
                      <li><a href="#twitter"><span className="fab fa-twitter"></span></a>
                      </li>
                      <li><a href="#google"><span className="fab fa-google-plus-g"></span></a>
                      </li>

                    </ul>
                  </div>
                </div>
                <div className="col-lg-2 sub-two-right">
                  <h6>Useful Links</h6>
                  <ul>
                    <li><a href="index.html">Home</a>
                    </li>
                    <li><a href="about.html">About Us</a>
                    </li>

                    <li><a href="services.html">Services</a>
                    </li>

                    <li><a href="locations.html">Locations</a>
                    </li>
                    <li><a href="contact.html">Contact</a></li>
                  </ul>
                </div>
                <div className="col-lg-2 sub-two-right">
                  <h6>Services</h6>
                  <ul>

                    <li><a href="Active-Shipping-and-Logistics-Air-Freight.html">Air Freight</a>
                    </li>
                    <li><a href="Active-Shipping-and-Logistics-Ocean-Freight.html">Ocean Freight
                    </a>
                    </li>
                    <li><a href="Active-Shipping-and-Logistics-Land-Transportation.html">Land Transportation
                    </a></li>
                    <li><a href="Active-Shipping-and-Logistics-Warehousing-and-Distribution.html">Warehousing and distribution
                    </a></li>
                    <li><a href="Active-Shipping-and-Logistics-Customs-Clearance-and-Door-delivery.html">Customs Clearance</a></li>


                  </ul>
                </div>
                <div className="col-lg-2 sub-two-right">
                  <h6>Services</h6>
                  <ul>
                    <li><a href="Active-Shipping-and-Logistics-Packing-and-Removals.html">Packing and removals</a>
                    </li>
                    <li><a href="Active-Shipping-and-Logistics-Dangerous-Goods.html">Dangerous goods</a></li>
                    <li><a href="services.html">Transshipment (sea to air, air to air)
                    </a>
                    </li>
                    <li><a href="services.html">Project management
                    </a></li>
                    <li><a href="services.html">RO-RO and Break bulk
                    </a></li>



                  </ul>
                </div>
                <div className="col-lg-2 sub-two-right">
                  <h6>Barnche Office</h6>
                  <ul>
                    <li><a href="contact.html">Mumbai , M.H</a>
                    </li>
                    <li><a href="locations.html">Visakhapatnam, A.P</a>
                    </li>
                    <li><a href="locations.html">Kakinada, A.P</a>
                    </li>

                    <li><a href="locations.html">Kolkata, W.B</a>
                    </li>

                    <li><a href="locations.html">Chennai, T.N</a>
                    </li>
                    <li><a href="locations.html">Mundra, G.J</a>
                    </li>
                    <li><a href="locations.html">Hyderabad, T.L</a>
                    </li>
                    <li><a href="locations.html">Delhi</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="below-section mt-5">
              <div className="copyright-footer">
                <div className="columns text-left">

                  <p>© <b id="year">{new Date().getFullYear()}</b> Active Shipping and Logistics. All rights reserved.Design by <a href="https://vikrantchaudhari.com/" target="_blank" rel="noreferrer">VS</a> with <a href="https://w3layouts.com/" target="_blank" rel="noreferrer">W3layouts</a>
                  </p>
                </div>
                <ul className="footer-w3list text-right">
                  <li><a href="#url">Privacy Policy</a>
                  </li>
                  <li><a href="#url">Terms &amp; Conditions</a>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </section>
        {/* move top */}
        <button
          onClick={topFunction}
          id="movetop"
          title="Go to top"
          style={{ display: showTop ? 'block' : 'none' }}
        >
          <span className="fas fa-level-up-alt" aria-hidden="true"></span>
        </button>
        {/* //move top */}
      </footer>
      {/*//footer-9 */}
    </>
  )
}

export default App
