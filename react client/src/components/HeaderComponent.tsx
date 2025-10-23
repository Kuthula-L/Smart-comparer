import React from 'react';

const HeaderComponent: React.FC = () => {
  return (
    <>
    <header style={styles.header}>
        <img src="Smart_Comparer_Logo-removebg.png" style={styles.logo} alt="Smart Compare Logo" />
        <img src="logout-svgrepo-com.svg" style={styles.logout} alt="Smart Compare Logout " />

    </header>
        </>
  );
};
const styles ={
    header: {
        display: "flex",
        justifyContent: "space-between", // pushes one to the left and the other to the right
        alignItems: "flex-start",
        padding: "10px 20px",
        //position: "absolute,"
        top: 0,
        left:0,
        right:0,
        zIndex: 3,

    }, 
    logo: {
        width: "100px",
        height: "100px",
        borderRadius: "60%",
        marginTop: "-10px",
        
    },
    logout: {
        width: "60px",
        height: "50px",
        cursor: "pointer",
        marginTop: "20px",
    }
}

export default HeaderComponent;
