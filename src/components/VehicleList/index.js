import React, { useState, useEffect } from 'react';
import useData from './useData';
import './style.scss';
import Modal from '../Modal';

export default function VehicleList() {

  // modal-implementation-start
  const [model, setModel] = useState(false);
  const [tempdata, setTempdata] = useState([]);

  const getModalData = (emissions, passengers, drivetrain, bodystyles) => {
    const temData = [emissions, passengers, drivetrain, bodystyles];
    // console.warn(temData);
    setTempdata(() => [1, ...temData]);
    return setModel(true);
  };
  // modal-implementation-end


  // eslint-disable-next-line no-unused-vars
  const [loading, error, vehicles] = useData();
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  // console.log('******VehicleCardData*******', vehicles);
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const mobileResize = () => {
    if (window.innerWidth < 720) {
      setIsMobileView(true);
    } else {
      setIsMobileView(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('resize', mobileResize);
  });

  if (loading) {
    return (
      <div data-testid="loading" className="loadApp">
        Loading....

      </div>
    );
  }

  if (error) {
    return <div data-testid="error">{ error }</div>;
  }
  

  const VehicleCard = (vehicleData) => {
    
    return (
      <>
        <div className="col">
          <div className="vehicleCard">
            <div className="vehicle__image">
              <img alt="vehile" src={isMobile ? vehicleData.vehicleData.media[1].url : vehicleData.vehicleData.media[0].url} />
            </div>
            <div className="vehicleDetails">
              <h3 className="vehicleDetails__name">
                Vehicle Name
              </h3>
              <p className="vehicleDetails__price">
                From &nbsp;
                { vehicleData.vehicleData.details ? vehicleData.vehicleData.details.price : '' }
              </p>
              <p className="vehicleDetails__desc">
                {vehicleData.vehicleData.details ? vehicleData.vehicleData.details.description : '' }
              </p>
            </div>
            <div className="vehicleDetails__btn">
              <button
                className="vehicleDetails--readmore-btn"
                onClick={() => getModalData(vehicleData.vehicleData.details.meta.emissions.template,
                  vehicleData.vehicleData.details.meta.passengers,
                  vehicleData.vehicleData.details.meta.drivetrain[0],
                  vehicleData.vehicleData.details.meta.bodystyles)}>Read more
              </button>
            </div>
          </div>
        </div>
      
      </>
    );
  };

  const MobileVehicleCard = (vehicleData) => {
    return (
      <>
        <div className="vehicleMobileDetails clearfix">
          <div className="vehicleMobileDetails__col left">
            <div className="vehicleMobileDetails__img">
              <img alt="vehile" src={vehicleData.vehicleData.media[1].url} />
            </div>
          </div>

          <div className="vehicleMobileDetails__col right">
            <div className="vbox__mobile__right__content">
              <h2 className="vehicleMobileDetails__name">
                Vehicle Name
              </h2>
              <p className="vehicleMobileDetails__price">
                From&nbsp;
                { vehicleData.vehicleData.details ? vehicleData.vehicleData.details.price : '' }
              </p>
              <p className="vehicleMobileDetails__desc">
                { vehicleData.vehicleData.details ? vehicleData.vehicleData.details.description : '' }
              </p>
            </div>
          </div>
          <div className="vehicleDetails__btn moview">
            <button
              className="vehicleDetails--readmore-btn moview"
              onClick={() => getModalData(vehicleData.vehicleData.details.meta.emissions.template,
                vehicleData.vehicleData.details.meta.passengers,
                vehicleData.vehicleData.details.meta.drivetrain[0],
                vehicleData.vehicleData.details.meta.bodystyles)}>Read more
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div data-testid="results" className="vehicleApp">
      <div className="container clearfix">
        {
          vehicles.map((vehicle, index) => (isMobileView ? vehicle && <MobileVehicleCard key={index} vehicleData={vehicle} />
            : vehicle && <VehicleCard key={`vehicleCardIndex-${vehicle.id}`} vehicleData={vehicle} />))
        }
        {
          model === true ? <Modal emissions={tempdata[1]} 
          passengers={tempdata[2]} drivetrain={tempdata[3]} 
          bodystyles={tempdata[4]}
          hide={() => setModel(false)}/> : ''
        }
      </div>

      {/* <p>List of vehicles will be displayed here</p>
      <p>
        Visit
        <a href="/api/vehicles.json" target="_blank"> /api/vehicles.json</a>
        {' '}
        (main endpoint)
      </p>
      <p>
        Visit
        <a href="/api/vehicle_fpace.json" target="_blank">/api/vehicle_fpace.json</a>
        {' '}
        (detail endpoint - apiUrl)
      </p>
      <p>
        Visit
        <a href="/api/vehicle_xf.json" target="_blank">/api/vehicle_xf.json</a>
        {' '}
        (vehicle without any price)
      </p> */}
    </div>
  );
}
