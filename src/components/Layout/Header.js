import { Fragment } from "react";
import mealsImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Delicious Meals</h1>
        <HeaderCartButton onOpenCart={props.onOpenCart}/>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="An Image full of Delicious Meals" />
      </div>
    </Fragment>
  );
};

export default Header;
