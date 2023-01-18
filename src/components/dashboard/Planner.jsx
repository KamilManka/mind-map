import React from 'react'
import { useEpg, Epg, Layout } from 'planby';


const Planner = () => {
    const channels = React.useMemo(
        () => [
          {
            logo: 'https://via.placeholder.com',
            uuid: '10339a4b-7c48-40ab-abad-f3bcaf95d9fa',
          },
        ],
        []
      );
      
      const epg = React.useMemo(
        () => [
          {
            channelUuid: '30f5ff1c-1346-480a-8047-a999dd908c1e',
            description:
              'Ut anim nisi consequat minim deserunt...',
            id: 'b67ccaa3-3dd2-4121-8256-33dbddc7f0e6',
            image: 'https://via.placeholder.com',
            since: "2022-02-02T23:50:00",
            till: "2022-02-02T00:55:00",
            title: 'Title',
          },
        ],
        []
      );
      
      const {
        getEpgProps,
        getLayoutProps,
        onScrollToNow,
        onScrollLeft,
        onScrollRight,
      } = useEpg({
        epg,
        channels,
        startDate: '2022/02/02', // or 2022-02-02T00:00:00
      });
      
      return (
        <div>
          <div style={{ height: '600px', width: '1200px' }}>
            <Epg {...getEpgProps()}>
              <Layout
                {...getLayoutProps()}
              />
            </Epg>
          </div>
        </div>
      );
}

export default Planner