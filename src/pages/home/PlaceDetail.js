import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

const CardExampleWithAvatar = () => (
  <Card>
    <CardHeader
      title="Fish River Canyon"
      subtitle="Canyons, Nature & Parks"
      avatar="http://media-cdn.tripadvisor.com/media/photo-l/0a/03/fd/f4/georganderson.jpg"
    />
    <CardMedia
      overlay={<CardTitle subtitle="Spectacular Views!" />}
    >
      <img src="http://media-cdn.tripadvisor.com/media/photo-w/02/6b/2c/a7/filename-img-1680-jpg.jpg" />
    </CardMedia>
    <CardTitle subtitle="5 reviews" />
    <CardText>
      The Fish River Canyon is the second largest natural gorge in Africa. It is quite like The Grand Canyon in the States but not so big. We admired it at the sunset from one of the...
    </CardText>
    <CardActions>
      <FlatButton label="view more" />
      <FlatButton label="Add to map" />
    </CardActions>
  </Card>
);

export default CardExampleWithAvatar;