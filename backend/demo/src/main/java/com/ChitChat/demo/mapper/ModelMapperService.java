package com.ChitChat.demo.mapper;

import org.modelmapper.ModelMapper;

public interface ModelMapperService {

    ModelMapper forRequest();
    ModelMapper forResponse();

}
