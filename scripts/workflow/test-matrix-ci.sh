#!/bin/bash

# =============================================
# Script: test-matrix-ci.sh
#
# 主要用途：
# - 測試 CI workflow 的 matrix strategy
# - 驗證 paths-filter 和條件執行邏輯
# - 支援測試不同的 job 和場景
#
# 使用方式：
# ./scripts/workflow/test-matrix-ci.sh changes  # 只測試 changes job
# ./scripts/workflow/test-matrix-ci.sh lint     # 測試 lint job (包含依賴)
# ./scripts/workflow/test-matrix-ci.sh typecheck # 測試 typecheck job (包含依賴)
# ./scripts/workflow/test-matrix-ci.sh all      # 測試所有 job
# =============================================

set -e

# 顏色定義
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 函數：顯示標題
show_header() {
    echo -e "${BLUE}=====================================${NC}"
    echo -e "${BLUE}  Testing CI Matrix Strategy${NC}"
    echo -e "${BLUE}=====================================${NC}"
    echo ""
}

# 函數：執行 act 命令
run_act() {
    local job_name=$1
    echo -e "${YELLOW}🚀  Testing job: ${job_name}${NC}"
    echo ""
    
    if act -j "$job_name" -W .github/workflows/ci.yml --container-architecture linux/amd64; then
        echo ""
        echo -e "${GREEN}✅  Job '${job_name}' succeeded!${NC}"
    else
        echo ""
        echo -e "${RED}❌  Job '${job_name}' failed!${NC}"
        return 1
    fi
}

# 函數：顯示使用說明
show_usage() {
    echo -e "${YELLOW}Usage:${NC}"
    echo "  $0 changes    # Test changes job only"
    echo "  $0 lint       # Test lint job (with dependencies)"
    echo "  $0 typecheck  # Test typecheck job (with dependencies)"
    echo "  $0 all        # Test all jobs"
    echo ""
}

# 主函數
main() {
    show_header
    
    # 檢查參數
    if [ $# -eq 0 ]; then
        echo -e "${RED}Error: No job specified${NC}"
        echo ""
        show_usage
        exit 1
    fi
    
    local job_type=$1
    
    case $job_type in
        "changes")
            run_act "changes"
            ;;
        "lint")
            run_act "lint"
            ;;
        "typecheck")
            run_act "typecheck"
            ;;
        "all")
            echo -e "${BLUE}Testing all jobs sequentially...${NC}"
            echo ""
            run_act "changes"
            echo ""
            echo -e "${BLUE}---${NC}"
            echo ""
            run_act "lint"
            echo ""
            echo -e "${BLUE}---${NC}"
            echo ""
            run_act "typecheck"
            echo ""
            echo -e "${GREEN}🎉  All jobs completed successfully!${NC}"
            ;;
        *)
            echo -e "${RED}Error: Unknown job type '$job_type'${NC}"
            echo ""
            show_usage
            exit 1
            ;;
    esac
    
    echo ""
    echo -e "${GREEN}✨  Test completed!${NC}"
}

# 檢查是否在正確的目錄
if [ ! -f ".github/workflows/ci.yml" ]; then
    echo -e "${RED}Error: Please run this script from the project root directory${NC}"
    exit 1
fi

# 執行主函數
main "$@" 