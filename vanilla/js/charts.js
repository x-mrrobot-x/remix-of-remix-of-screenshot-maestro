// Charts Module - Chart.js based charts for statistics page

// Chart Colors
const CHART_COLORS = {
  primary: 'hsl(175, 80%, 50%)',
  primaryRgb: 'rgb(26, 204, 179)',
  info: 'hsl(199, 89%, 48%)',
  infoRgb: 'rgb(14, 165, 233)',
  success: 'hsl(142, 70%, 45%)',
  successRgb: 'rgb(34, 197, 94)',
  warning: 'hsl(38, 92%, 50%)',
  warningRgb: 'rgb(245, 158, 11)',
  purple: 'hsl(280, 70%, 50%)',
  purpleRgb: 'rgb(168, 85, 247)',
  muted: 'hsl(215, 20%, 45%)',
  mutedRgb: 'rgb(100, 116, 139)',
  grid: 'rgba(51, 65, 85, 0.5)',
  text: 'hsl(215, 20%, 55%)',
  background: 'hsl(222, 47%, 8%)',
};

// Weekly activity data
const weeklyData = {
  labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
  screenshots: [18, 24, 20, 32, 28, 22, 20],
  organized: [15, 22, 18, 28, 25, 20, 20],
};

// App distribution data
const appDistribution = [
  { name: 'Chrome', count: 45, color: CHART_COLORS.primaryRgb },
  { name: 'VS Code', count: 32, color: CHART_COLORS.infoRgb },
  { name: 'Figma', count: 28, color: CHART_COLORS.successRgb },
  { name: 'Slack', count: 19, color: CHART_COLORS.warningRgb },
  { name: 'Discord', count: 15, color: CHART_COLORS.purpleRgb },
  { name: 'Outros', count: 25, color: CHART_COLORS.mutedRgb },
];

// Store chart instances for cleanup
let activityChartInstance = null;
let distributionChartInstance = null;

// Draw Activity Area Chart with Chart.js
function drawActivityChart() {
  const canvas = document.getElementById('activityChart');
  if (!canvas) return;
  
  // Destroy existing chart if any
  if (activityChartInstance) {
    activityChartInstance.destroy();
  }
  
  const ctx = canvas.getContext('2d');
  
  // Create gradients
  const screenshotsGradient = ctx.createLinearGradient(0, 0, 0, 300);
  screenshotsGradient.addColorStop(0, 'rgba(26, 204, 179, 0.4)');
  screenshotsGradient.addColorStop(1, 'rgba(26, 204, 179, 0)');
  
  const organizedGradient = ctx.createLinearGradient(0, 0, 0, 300);
  organizedGradient.addColorStop(0, 'rgba(14, 165, 233, 0.4)');
  organizedGradient.addColorStop(1, 'rgba(14, 165, 233, 0)');
  
  activityChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: weeklyData.labels,
      datasets: [
        {
          label: 'Screenshots',
          data: weeklyData.screenshots,
          borderColor: CHART_COLORS.primaryRgb,
          backgroundColor: screenshotsGradient,
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: CHART_COLORS.primaryRgb,
          pointBorderColor: CHART_COLORS.primaryRgb,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: 'Organizados',
          data: weeklyData.organized,
          borderColor: CHART_COLORS.infoRgb,
          backgroundColor: organizedGradient,
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: CHART_COLORS.infoRgb,
          pointBorderColor: CHART_COLORS.infoRgb,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index',
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: 'hsl(222, 47%, 11%)',
          titleColor: 'hsl(210, 40%, 98%)',
          bodyColor: 'hsl(215, 20%, 65%)',
          borderColor: 'hsl(222, 30%, 18%)',
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          displayColors: true,
          boxPadding: 4,
        },
      },
      scales: {
        x: {
          grid: {
            color: CHART_COLORS.grid,
            drawBorder: false,
          },
          ticks: {
            color: CHART_COLORS.text,
            font: {
              family: 'Inter, sans-serif',
              size: 12,
            },
          },
        },
        y: {
          grid: {
            color: CHART_COLORS.grid,
            drawBorder: false,
          },
          ticks: {
            color: CHART_COLORS.text,
            font: {
              family: 'Inter, sans-serif',
              size: 12,
            },
          },
          beginAtZero: true,
        },
      },
    },
  });
}

// Draw Doughnut Chart for Distribution with Chart.js
function drawDistributionChart() {
  const canvas = document.getElementById('distributionChart');
  if (!canvas) return;
  
  // Destroy existing chart if any
  if (distributionChartInstance) {
    distributionChartInstance.destroy();
  }
  
  const ctx = canvas.getContext('2d');
  
  distributionChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: appDistribution.map(d => d.name),
      datasets: [{
        data: appDistribution.map(d => d.count),
        backgroundColor: appDistribution.map(d => d.color),
        borderColor: 'transparent',
        borderWidth: 0,
        hoverOffset: 8,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: 'hsl(222, 47%, 11%)',
          titleColor: 'hsl(210, 40%, 98%)',
          bodyColor: 'hsl(215, 20%, 65%)',
          borderColor: 'hsl(222, 30%, 18%)',
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: function(context) {
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((context.parsed / total) * 100).toFixed(0);
              return `${context.label}: ${context.parsed} (${percentage}%)`;
            }
          }
        },
      },
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1000,
        easing: 'easeOutQuart',
      },
    },
  });
  
  // Populate legend
  const total = appDistribution.reduce((sum, d) => sum + d.count, 0);
  const legendContainer = document.getElementById('distributionLegend');
  if (legendContainer) {
    legendContainer.innerHTML = appDistribution.map(d => {
      const percentage = ((d.count / total) * 100).toFixed(0);
      return `
        <div class="distribution-legend-item">
          <span class="distribution-legend-color" style="background: ${d.color}"></span>
          <span class="distribution-legend-name">${d.name}</span>
          <span class="distribution-legend-value">${percentage}%</span>
        </div>
      `;
    }).join('');
  }
}

// Draw Progress Ring (keeping canvas-based for simplicity)
function drawProgressRing() {
  const canvas = document.getElementById('progressRing');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  
  canvas.width = 180 * dpr;
  canvas.height = 180 * dpr;
  ctx.scale(dpr, dpr);
  
  const centerX = 90;
  const centerY = 90;
  const radius = 75;
  const lineWidth = 12;
  const progress = 0.9; // 90%
  
  // Animation
  let animationProgress = 0;
  const animationDuration = 1500;
  const startTime = Date.now();
  
  function animate() {
    const elapsed = Date.now() - startTime;
    animationProgress = Math.min(elapsed / animationDuration, 1);
    const easeProgress = 1 - Math.pow(1 - animationProgress, 3);
    
    ctx.clearRect(0, 0, 180, 180);
    
    // Background ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'hsl(222, 30%, 14%)';
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    
    // Progress ring
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (Math.PI * 2 * progress * easeProgress);
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 180, 180);
    gradient.addColorStop(0, CHART_COLORS.primary);
    gradient.addColorStop(1, CHART_COLORS.info);
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.stroke();
    
    // Update percentage text
    const percentageEl = document.getElementById('progressPercentage');
    if (percentageEl) {
      percentageEl.textContent = Math.round(progress * 100 * easeProgress) + '%';
    }
    
    if (animationProgress < 1) {
      requestAnimationFrame(animate);
    }
  }
  
  animate();
}

// Initialize all charts
function initCharts() {
  drawActivityChart();
  drawDistributionChart();
  drawProgressRing();
}

// Redraw charts on resize
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const statsPage = document.getElementById('page-stats');
    if (statsPage && statsPage.classList.contains('page-active')) {
      initCharts();
    }
  }, 250);
});
