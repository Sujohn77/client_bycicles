import { Button } from "@material-ui/core";
import React from "react";
import styles from "./tripResult.module.scss";
import tripImg from "imgs/trip.jpg";

const TripResult = ({ route, name, dateFrom, dateTo, countBicycle, difficulty, guide, tourists, img, price }) => {
    return (
        <div className={styles.trip__result}>
            <div className={styles.header}>
                <h3>{name}</h3>
                <div className={styles.buttons}>
                    <Button>Детальніше</Button>
                    <Button className={styles.accept} title="123">
                        Взяти участь
                    </Button>
                </div>
            </div>
            <div className={styles.content}>
                <div className="w-50">
                    <img alt="Img" src={img || tripImg} />
                </div>
                <div className={styles.description}>
                    <div>
                        <b>Маршрут:</b> {route}
                    </div>
                    <div>
                        <b>Починаємо:</b> {dateFrom}
                    </div>
                    <div>
                        <b>Закінчуємо:</b> {dateTo}
                    </div>
                    <div>
                        <b>Кількість велосипедів:</b> {countBicycle}
                    </div>
                    <div>
                        <b>Складність:</b> {difficulty}
                    </div>
                    <div>
                        <b>Керівник: </b>
                        {guide}
                    </div>
                    <div>
                        <b>Ціна:</b> {price}
                    </div>
                    {tourists && (
                        <div>
                            <b>Туристы: </b>
                            {tourists}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export { TripResult };
