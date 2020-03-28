export default {
  
    palette: {
      primary: {
        main: '#ec3c3c',
        light: '#ff7267',
        dark: '#b20014',
        contrastText: '#333'
      },
      secondary: {
        main: '#ddd',
        light: '#fff',
        dark: '#ababab',
        contrastText: '#000'
      }
    },
    typography:{
      userNextVariants: true
    },
    spreadIt:{
      form:{
        textAlign: 'center'
      },
      img: {
          margin: '20px auto 20px auto',
          maxWidth: '150px'
      },
      pageTitle:{
          margin: '10px auto 10px auto'
      },
      textField:{
          margin: '10px auto 10px auto'
      },
      button:{
          margin: 20,
          position: 'relative'
      },
      customError:{
          marginTop: 10,
          color: 'red',
          fontSize: '0.8rem'
      },
      progress:{
          position: 'absolute'
      },
      paper:{
        padding: 20
      },
      invisibleSeperator: {
        border:'none',
        margin: 5
      },
      visibleSeperator:{
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: '20px'
      },
      profile: {
        '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
          '& button': {
            position: 'absolute',
            top: '80%',
            left: '70%'
          }
        },
        '& .profile-image': {
          width: 200,
          height: 200,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%'
        },
        '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
            verticalAlign: 'middle'
          },
          '& a': {
            color: '#00bcd4'
          }
        },
        '& hr': {
          border: 'none',
          margin: '0 0 10px 0'
        },
        '& svg.button': {
          '&:hover': {
            cursor: 'pointer'
          }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
          margin: '20px 10px'
        }
      },
      topUnis:{
          marginTop: 20
      }
    }
    
}