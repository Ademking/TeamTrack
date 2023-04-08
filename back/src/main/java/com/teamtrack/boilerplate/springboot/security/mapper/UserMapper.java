package com.teamtrack.boilerplate.springboot.security.mapper;

import com.teamtrack.boilerplate.springboot.model.User;
import com.teamtrack.boilerplate.springboot.security.dto.AuthenticatedUserDto;
import com.teamtrack.boilerplate.springboot.security.dto.RegistrationRequest;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

/**
 * @author TeamTrack SESAME
 */
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

	UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

	User convertToUser(RegistrationRequest registrationRequest);

	AuthenticatedUserDto convertToAuthenticatedUserDto(User user);

	User convertToUser(AuthenticatedUserDto authenticatedUserDto);

}
