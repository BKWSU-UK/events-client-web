

// Define a default UI for filtering
import {isChrome} from "../utils/browserDetection";
import React from "react";
import {useTranslation} from "../i18n";

function GlobalFilter({
                          globalFilter,
                          setGlobalFilter,
                          rowsLength
                      }) {
    const { t, i18n } = useTranslation();
    return (
        <div className="col-md-6 col-sm-12 ">
            <div className="form-group row mb-0">
                <label htmlFor="searchInput" className="col-2 col-form-label text-right">{t('search')}</label>
                <div className="col-6">
                    <input
                        id="searchInput"
                        value={globalFilter || ''}
                        onChange={e => {
                            setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
                        }}
                        placeholder={t('enter-search')}
                        className="form-control"
                        autoComplete={isChrome ? "nope" : "off"}
                    />
                </div>
                <div className="col-4 text-success" style={{marginTop: "6px"}}>
                    {rowsLength} {t('event', {count: rowsLength})} ...
                </div>
            </div>
        </div>
    )
}

export default GlobalFilter;