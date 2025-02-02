/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { gameProgress } from 'reducers/labyrinth';
import { Loader } from './Loader';
import { GameWrapper, ActionWrapper, SingleActionWrapper, ActionTop, CurrentRoomDescriptionText, NextRoomDescriptionText } from './GameCSS';
import { Btn } from './StartScreenCSS';
import { EnvironmentIMG } from './EnvironmentIMG';

const Game = () => {
  const labyrinth = useSelector((store) => store.labyrinth)
  const resp = useSelector((store) => store.labyrinth.response)
  const isLoading = useSelector((state) => state.labyrinth.isLoading)
  const dispatch = useDispatch();

  if (isLoading) {
    return <Loader />
  } else {
    return (
      <GameWrapper>
        <ActionTop>
          <EnvironmentIMG coordinates={resp.coordinates} />
          <CurrentRoomDescriptionText>{labyrinth.response.description}</CurrentRoomDescriptionText>
        </ActionTop>
        <ActionWrapper>
          {labyrinth.response.actions && labyrinth.response.actions.map((userAction) =>
            <SingleActionWrapper key={userAction.type && userAction.direction}>
              <NextRoomDescriptionText>{userAction.description}</NextRoomDescriptionText>
              <Btn
                type="button"
                onClick={
                  () => dispatch(gameProgress(userAction.direction))
                }>
              Go {userAction.direction}
              </Btn>
            </SingleActionWrapper>)}
        </ActionWrapper>
      </GameWrapper>)
  }
}
export default Game;
