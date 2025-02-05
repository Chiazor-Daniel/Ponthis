import React from 'react';
import "swiper/css";
import TotalBalanceArea from './TotalBalanceArea';
import ProfitLossArea from './ProfitLossArea';
import TotaldipositChart from './TotaldipositChart';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const BalanceCardSlider = ({ accountData }) => {
    const { referral_balance, main_balance, bonus_balance } = useSelector(state => state.userAccount || {});

    const slidesData = [
        {
            countNum: `$ ${main_balance || (accountData && accountData.main_balance) || "***"}`,
            title: "Main Balance",
            info: "0",
            chartComponent: <TotalBalanceArea />
        },
        {
            countNum: `$ ${referral_balance || (accountData && accountData.referral_balance) || "***"}`,
            title: "Referral Balance",
            info: "",
            chartComponent: <ProfitLossArea />
        },
        {
            countNum: `$ ${bonus_balance || (accountData && accountData.bonus_balance) || "***"}`,
            title: "Bonuses",
            chartComponent: <TotaldipositChart />
        }
    ];

    return (
        <div className='row'>
            {/* Map over the slidesData array and generate a SwiperSlide for each */}
            {slidesData.map((slide, index) => (
                <div key={index} className="col-md-4 mb-3">
                    <div className="card card-wiget">
                        <div className="card-body">
                            <div className="card-wiget-info">
                                <h4 className="count-num">{slide.countNum}</h4>
                                <p>{slide.title}</p>
                                {slide.info && (
                                    <div>
                                        <span className="text-success" style={{ opacity: 0 }}>{slide.info}</span>
                                    </div>
                                )}
                            </div>
                            {slide.chartComponent}
                        </div>
                        <div className="back-icon">
                            {/* Your back icon SVG */}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default BalanceCardSlider
