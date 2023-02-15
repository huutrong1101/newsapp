import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const TabsSkeleton = () => {
  return (
    <div className="tabs__listItem">
      <div className="tabs__tag"><Skeleton width={80} /></div>
      <h3 className="tabs__title"><Skeleton /></h3>
      <p className="tabs__date"><Skeleton width={120} /></p>
    </div>
  )
}

export default TabsSkeleton