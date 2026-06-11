$font-heading: 'Plus Jakarta Sans', sans-serif; // title
$font-body: 'Inter', sans-serif; // text


//H
h1 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 72px;
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -2px;
} // $fs-h1

h2 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 48px;
  font-weight: 700;
  line-height: 1.1;
} // $fs-h2

h3 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 36px;
  font-weight: 700;
} // $fs-h3

h4 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 28px;
  font-weight: 600;
} // $fs-h4

h5 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 22px;
  font-weight: 600;
} // $fs-h5

body {
  font-family: "Inter"
  font-size: 16px;
  font-weight: 400;
} // $fs-body

small {
  font-family: "Inter"
  font-size: 14px;
  font-weight: 500;
} // $fs-small

h1,h2,h3,h4,h5,h6 {
  font-family: $font-heading;

  color: $text-primary;

  margin-bottom: 1rem;
}


// FONT WEIGHTS
$fw-regular: 400;
$fw-medium: 500;
$fw-semibold: 600;
$fw-bold: 700;
$fw-extrabold: 800;


//PALETTE COLORI
$primary: #5E41EE;
$text-primary: #FFFFFF 
$text-secondary: #B6BDD2

// BACKGROUND
$bg-primary: #000412;
$bg-secondary: #0D1320;
$bg-card: #0B111E;
$bg-card-hover: #182235;
bg-item-dark: #0B111E;

.btn-primary {
    color: white;
    background-color: #5E41EE;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn-primary:hover {
    background-color: #4e37c0;
    transform: translatey(-2px);
}

.btn-secondary {
    color: white;
    background-color: transparent;
    border: 1px solid #ffffff;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn-secondary:hover {
    color: #000412;
    background-color: #ffffff;
    transform: translatey(-2px);
}

.btn-third {
    color: white;
    background-color: #D22FD5;
    transition: background-color 0.3s ease, transform 0.3s ease;; 
}

.btn-third:hover {
    background-color: #aa26ad;
    transform: translatey(-2px);
}
