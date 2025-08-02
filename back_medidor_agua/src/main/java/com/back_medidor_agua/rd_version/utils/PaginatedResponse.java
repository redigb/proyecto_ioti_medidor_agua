package com.back_medidor_agua.rd_version.utils;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PaginatedResponse<T> {
    private int page;
    private int perPage;
    private long totalItems;
    private int totalPages;
    private List<T> items;

    public PaginatedResponse(int page, int perPage, long totalItems, List<T> items) {
        this.page = page;
        this.perPage = perPage;
        this.totalItems = totalItems;
        this.totalPages = (int) Math.ceil((double) totalItems / perPage);
        this.items = items;
    }
}
