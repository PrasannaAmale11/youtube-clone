import React from 'react';
import moment from 'moment';

const VideoLength = ({ time }) => {
  const duration = moment.duration(Number(time) * 1000);
  const formattedDuration = moment.utc(duration.asMilliseconds()).format('H:mm:ss');

  return (
    <span className="absolute bottom-2 right-2 bg-black py-1 px-2 text-white text-xs rounded-md">
      {formattedDuration}
    </span>
  );
};

export default VideoLength;
