import React from "react";
import PropTypes from "prop-types";
import Button from "../common/Button";
import {
  StyledContainer,
  StyledUserGroup,
  StyledTitle,
  StyledItemLeft,
  StyledItemCenter,
  StyledItemRight
} from "./styles";

let HeaderSub = ({ player, room, onLogout, onBackHome, showBackHome }) => {
  const { name: roomName } = room;
  const { name: playerName } = player;
  return (
    <StyledContainer>
      <StyledItemLeft>
        {roomName ? (
          <Button onClick={onBackHome}>Back Home</Button>
        ) : (
          <StyledTitle>Tetris Orange</StyledTitle>
        )}
      </StyledItemLeft>
      <StyledItemCenter>
        {roomName ? <StyledTitle>{roomName}</StyledTitle> : ""}
      </StyledItemCenter>
      <StyledItemRight>
        {playerName && (
          <StyledUserGroup>
            <p>{playerName}</p>
            <Button style={{ marginLeft: 20 }} onClick={onLogout}>
              Logout
            </Button>
          </StyledUserGroup>
        )}
      </StyledItemRight>
    </StyledContainer>
  );
};

HeaderSub.propTypes = {
  player: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
  onBackHome: PropTypes.func.isRequired
};

export default HeaderSub;
