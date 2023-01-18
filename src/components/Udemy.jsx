// import axios from 'axios';
import React, { useEffect, useState } from "react";

const clientId = "w0I3Np4gQEtfO4yAbbhjBfdzOuyBmOJkIw2hA83g";
const clientSecret =
  "mlqKlb7zfVKU425vQllkNP17QhrndG1DHbiiFoKEOyy1YqKFko3cTFdYFBWgKr5NYdNnwkMbT5EUyh5cLHszS2c0E9eeWrpteb4JgQAkZzQkxqUE6TDrfrigEqF3mSVA";

const Udemy = () => {
  const requestToken = async () => {
    try {
      const response = await fetch(
        "https://www.udemy.com/api-2.0/oauth/token",
        // {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/x-www-form-urlencoded",
        //   },
        //   body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
        // }
         {
          method: "GET",
          headers: {
            Authorization: `Basic dzBJM05wNGdRRXRmTzR5QWJiaGpCZmR6T3V5Qm1PSmtJdzJoQTgzZzogICJtbHFLbGI3emZWS1U0MjV2UWxsa05QMTdRaHJuZEcxREhiaWlGb0tFT3l5MVlxS0ZrbzNjVEZkWUZCV2dLcjVOWWRObndrTWJUNUVVeWg1Y0xIc3pTMmMwRTllZVdycHRlYjRKZ1FBa1p6UWt4cVVFNlREcmZyaWdFcUYzbVNWQSI7`,
          },
        }
      );

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error(error);
    }
  };

  const getCourseData = async () => {
    try {
      // debugger;
      // const token = await requestToken();
      // console.log(token)
      const response = await fetch(
        `https://www.udemy.com/api-2.0/courses/?page_size=10`,
        {
          method: "GET",
          headers: {  
            "Accept": "application/json, text/plain, */*",
          "Authorization": "Basic dzBJM05wNGdRRXRmTzR5QWJiaGpCZmR6T3V5Qm1PSmtJdzJoQTgzZzogICJtbHFLbGI3emZWS1U0MjV2UWxsa05QMTdRaHJuZEcxREhiaWlGb0tFT3l5MVlxS0ZrbzNjVEZkWUZCV2dLcjVOWWRObndrTWJUNUVVeWg1Y0xIc3pTMmMwRTllZVdycHRlYjRKZ1FBa1p6UWt4cVVFNlREcmZyaWdFcUYzbVNWQSI7",
          "Content-Type": "application/json;charset=utf-8"
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    getCourseData().then((data) => {
      setCourseData(data);
      console.log(courseData);
    });
  }, []);

  return (
    <div>
      {courseData && (
        <div>
          <h1>{courseData.title}</h1>
          <p>{courseData.description}</p>
        </div>
      )}
    </div>
  );
};

export default Udemy;
